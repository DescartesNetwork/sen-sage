import { web3 } from '@coral-xyz/anchor'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import { TokenInfo, TokenListProvider } from '@solana/spl-token-registry'
import axios from 'axios'
import { Cache } from 'cache-manager'
import { MintMetadata } from 'providers/jupag/jupag.service'

const SOL: MintMetadata = {
  address: web3.SystemProgram.programId.toBase58(),
  chainId: 101,
  symbol: 'SOL',
  name: 'Solana',
  decimals: 9,
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
  tags: ['native'],
  extensions: {
    coingeckoId: 'solana',
  },
}
const WRAPPED_SOL_ADDRESS = 'So11111111111111111111111111111111111111112'

@Injectable()
export class LegacyService {
  private registry: TokenInfo[]
  private readonly cacheTTL: number = 60 * 60

  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  private async getRegistry() {
    if (this.registry) return this.registry
    const provider = await new TokenListProvider().resolve()
    this.registry = provider.filterByClusterSlug('mainnet-beta').getList()
    return this.registry
  }

  /**
   * Get mint metadata from jup.ag
   * @param mintAddress Mint address
   * @returns Mint
   */
  async getMintByAddress(
    mintAddress: string,
  ): Promise<MintMetadata | undefined> {
    try {
      if (mintAddress === SOL.address) return SOL
      const registry = await this.getRegistry()
      const token = registry.find(({ address }) => address === mintAddress)
      if (!token) return undefined
      const mint: MintMetadata = {
        address: mintAddress,
        chainId: 101,
        decimals: token.decimals,
        name: token.name,
        symbol: token.symbol,
        logoURI: token.logoURI || '',
        tags: token.tags || [],
        extensions: {
          coingeckoId: token.extensions.coingeckoId,
        },
      }
      return mint
    } catch (er) {
      return undefined
    }
  }

  /**
   * Get price by mint address
   * @param mintAddress Mint address
   * @returns Price
   */
  async getPriceByMintAddress(mintAddress: string) {
    try {
      if (mintAddress === SOL.address) mintAddress = WRAPPED_SOL_ADDRESS
      const local = await this.cache.get<number | undefined>(
        `price:${mintAddress}`,
      )
      if (local) return local
      const registry = await this.getRegistry()
      const token = registry.find(({ address }) => address === mintAddress)
      const coingeckoId = token?.extensions?.coingeckoId
      if (!coingeckoId) return undefined
      const { data } = await axios.get<Record<string, { usd: number }>>(
        `https://api.coingecko.com/api/v3/simple/price?ids=${mintAddress}&vs_currencies=usd`,
      )
      const price = data?.[coingeckoId]?.usd
      if (price !== undefined)
        this.cache.set(`price:${mintAddress}`, price, { ttl: this.cacheTTL })
      return price
    } catch (er) {
      return undefined
    }
  }
}
