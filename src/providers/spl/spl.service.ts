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
      const atomicMints = await Promise.all(
        mints.map((e) => this.recursiveMintByAddress(e.toBase58())),
      )
      const symbol = atomicMints.length
        ? atomicMints.map(({ symbol }) => symbol).join(' • ')
        : mintAddress.substring(0, 6)
      const mint = {
        address: mintAddress,
        chainId: 101,
        decimals: decimals,
        name: 'SenSwap LP Token',
        symbol,
        logoURI: '',
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
