import { Metaplex } from '@metaplex-foundation/js'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import { PublicKey } from '@solana/web3.js'
import { Cache } from 'cache-manager'
import configuration from 'config/configuration'
import { connection } from 'helpers/connection'
import { MintMetadata } from 'providers/jupag/jupag.service'

@Injectable()
export class MplService extends Metaplex {
  private readonly cacheTTL: number = 24 * 60 * 60

  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {
    super(connection(configuration().solana.heliusApiToken))
  }

  /**
   * Get mint metadata from metaplex
   * @param mintAddress Mint address
   * @returns Mint
   */
  async getMintByAddress(
    mintAddress: string,
  ): Promise<MintMetadata | undefined> {
    try {
      const local = await this.cache.get<MintMetadata>(
        `metadata:${mintAddress}`,
      )
      if (local) return local
      const {
        mint: { decimals },
        name,
        symbol,
        json,
      } = await this.nfts().findByMint({
        mintAddress: new PublicKey(mintAddress),
      })
      const mint: MintMetadata = {
        address: mintAddress,
        chainId: 101,
        decimals,
        name,
        symbol,
        logoURI: json?.image || '',
        tags: ['metaplex', 'sft'],
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
