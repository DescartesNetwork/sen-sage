import { AnchorProvider, Program, Wallet } from '@coral-xyz/anchor'
import { splTokenProgram } from '@coral-xyz/spl-token'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Connection, Keypair } from '@solana/web3.js'
import { BalansolService } from 'providers/balansol/balansol.service'
import { MintMetadata } from 'providers/jupag/jupag.service'
import { Cache } from 'cache-manager'
import { SplToken } from './spl.abi'
import axios from 'axios'
import sharp from 'sharp'
import { createGif } from 'sharp-gif2'

const SIZE = 64

@Injectable()
export class SplService {
  public readonly program: Program<SplToken>

  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache,
    private readonly config: ConfigService,
    private readonly balansol: BalansolService,
  ) {
    this.program = splTokenProgram({
      provider: new AnchorProvider(
        new Connection(config.get('solana.cluster', { infer: true })),
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
      const logoURI = `${this.config.get('server.host', {
        infer: true,
      })}/logo/${mintAddress}.webp`
      let img = await this.cache.get<Buffer>(`logo:${mintAddress}`)
      if (!img) {
        const frames = await Promise.all(
          logoURIs.map(async (url) => {
            const { data } = await axios.get(url, {
              responseType: 'arraybuffer',
            })
            return sharp(data).resize(SIZE, SIZE)
          }),
        )
        const gif = await createGif({
          width: SIZE,
          height: SIZE,
          delay: 500,
        })
          .addFrame(frames)
          .toSharp()
        img = await gif.webp({ loop: 0 }).toBuffer()
      }
      // Force set to make sure the token logo live longer than the token metadata
      await this.cache.set(`logo:${mintAddress}`, img)
      return logoURI
    } catch (er) {
      return undefined
    }
  }

  /**
   * Return image data from cache
   * @param mintAddress Mint address
   * @returns Image buffer
   */
  async getImageByMintAddress(mintAddress: string) {
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
  async getMintByAddress(mintAddress: string) {
    try {
      const local = await this.cache.get<MintMetadata>(
        `metadata:${mintAddress}`,
      )
      if (local) return local
      const { decimals } = await this.program.account.mint.fetch(mintAddress)
      const {
        account: { mints },
      } = await this.balansol.getPoolByLpAddress(mintAddress)
      const atomicMints = await Promise.all<MintMetadata>(
        mints.map((e) => this.recursiveMintByAddress(e.toBase58())),
      )
      const symbol = atomicMints.map(({ symbol }) => symbol).join(' • ')
      const logoURI = await this.constructLogoUri(
        atomicMints.map(({ logoURI }) => logoURI),
        { mintAddress },
      )
      const mint = {
        address: mintAddress,
        chainId: 101,
        decimals: decimals,
        name: 'SenSwap LP Token',
        symbol: symbol || mintAddress.substring(0, 6),
        logoURI: logoURI || '',
        tags: ['spl'],
        extensions: {},
      }
      await this.cache.set(`metadata:${mintAddress}`, mint)
      return mint
    } catch (er) {
      return undefined
    }
  }
}
