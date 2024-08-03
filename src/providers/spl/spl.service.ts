import { AnchorProvider, Program, Wallet } from '@coral-xyz/anchor'
import { splTokenProgram } from '@coral-xyz/spl-token'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Keypair } from '@solana/web3.js'
import { BalansolService } from 'providers/balansol/balansol.service'
import { MintMetadata } from 'providers/jupag/jupag.service'
import { Cache } from 'cache-manager'
import { SplToken } from './spl.abi'
import axios from 'axios'
import sharp, { Create } from 'sharp'
import GIFEncoder from 'gifencoder'
import { connection } from 'helpers/connection'

const FRAME: Create = {
  width: 48,
  height: 48,
  channels: 4,
  background: { r: 0, g: 0, b: 0, alpha: 0 },
}

@Injectable()
export class SplService {
  public readonly program: Program<SplToken>
  private readonly cacheTTL: number = 24 * 60 * 60

  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache,
    private readonly config: ConfigService,
    @Inject(forwardRef(() => BalansolService))
    private readonly balansol: BalansolService,
  ) {
    this.program = splTokenProgram({
      provider: new AnchorProvider(
        connection(config.get('solana.heliusApiToken', { infer: true })),
        new Wallet(new Keypair()),
        { commitment: 'confirmed' },
      ),
    })
  }

  private async recursiveMintByAddress(mintAddress: string) {
    const { data: mint } = await axios.get(
      `http://localhost:${this.config.get('server.port', {
        infer: true,
      })}/metadata/${mintAddress}`,
    )
    return mint
  }

  private async constructLogoUri(
    logoURIs: string[],
    { mintAddress }: { mintAddress: string },
  ) {
    try {
      let img = await this.cache.get<Buffer>(`logo:${mintAddress}`)
      if (!img) {
        const frames: any[] = await Promise.all(
          logoURIs.map(async (url) => {
            const frame = sharp({ create: FRAME })
            const { data } =
              (url &&
                (await axios.get<Buffer>(url, {
                  responseType: 'arraybuffer',
                }))) ||
              {}
            const input =
              data &&
              (await sharp(data).resize(FRAME.width, FRAME.height).toBuffer())
            if (input) frame.composite([{ input }])
            const buf = await frame.raw().toBuffer()
            return buf
          }),
        )
        const encoder = new GIFEncoder(FRAME.width, FRAME.height)
        const buf = encoder
          .createReadStream()
          .pipe(sharp({ animated: true }).webp({ loop: 0 }))
        encoder.start()
        encoder.setRepeat(0)
        encoder.setDelay(500)
        for (const frame of frames) encoder.addFrame(frame)
        encoder.finish()
        img = await buf.toBuffer()
      }
      // Force set to make sure the token logo live longer than the token metadata
      await this.cache.set(`logo:${mintAddress}`, img, {
        ttl: this.cacheTTL,
      })
      return `${this.config.get('server.host', {
        infer: true,
      })}/${this.config.get('server.post', {
        infer: true,
      })}/logo/${mintAddress}.webp`
    } catch (er) {
      return undefined
    }
  }

  /**
   * Return image data from cache
   * @param mintAddress Mint address
   * @returns Image buffer
   */
  async getImageByMintAddress(
    mintAddress: string,
  ): Promise<Buffer | undefined> {
    try {
      const img = await this.cache.get<Buffer>(`logo:${mintAddress}`)
      return img
    } catch (er) {
      return undefined
    }
  }

  /**
   * Get mint metadata from SPL program
   * @param mintAddress Mint address
   * @returns Mint
   */
  async getMintByAddress(
    mintAddress: string,
  ): Promise<MintMetadata | undefined> {
    try {
      const local = await this.cache.get<MintMetadata | undefined>(
        `metadata:${mintAddress}`,
      )
      if (local) return local
      const { decimals } = await this.program.account.mint.fetch(mintAddress)
      const pool = await this.balansol.getPoolByLpAddress(mintAddress)

      // Not the LP token
      if (!pool) {
        return {
          address: mintAddress,
          chainId: 101,
          symbol: '---',
          name: 'Unknown Token',
          logoURI: '',
          decimals: 9,
          tags: [],
          extensions: {},
        }
      }

      const {
        account: { mints },
      } = pool
      const atomicMints = await Promise.all<MintMetadata>(
        mints.map((e) => this.recursiveMintByAddress(e.toBase58())),
      )
      const symbol = `Σ(${
        atomicMints.map(({ symbol }) => symbol).join(', ') ||
        mintAddress.substring(0, 6)
      })`
      const logoURI =
        (await this.constructLogoUri(
          atomicMints.map(({ logoURI }) => logoURI),
          { mintAddress },
        )) || ''
      const mint: MintMetadata = {
        address: mintAddress,
        chainId: 101,
        decimals: decimals,
        name: 'SenSwap LP Token',
        symbol,
        logoURI,
        tags: ['spl'],
        extensions: {},
      }
      await this.cache.set(`metadata:${mintAddress}`, mint, {
        ttl: this.cacheTTL,
      })
      return mint
    } catch (er) {
      return undefined
    }
  }
}
