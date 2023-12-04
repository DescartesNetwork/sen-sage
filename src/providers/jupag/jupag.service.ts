import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import axios from 'axios'
import { Cache } from 'cache-manager'

export type ChainId = 101 | 102 | 103
export type MintMetadata = {
  address: string
  chainId: ChainId
  decimals: number
  name: string
  symbol: string
  logoURI: string
  tags: string[]
  extensions: {
    coingeckoId?: string
  }
}

@Injectable()
export class JupagService {
  private readonly cacheTTL: number = 60 * 60 * 1000

  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  /**
   * Get mint metadata from jup.ag
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
      const { data } = await axios.get<MintMetadata[]>(
        'https://token.jup.ag/all',
      )
      if (!data) return undefined
      const mint = data.find(({ address }) => address === mintAddress)
      this.cache.set(`metadata:${mint.address}`, mint, 7 * 24 * 60 * 60 * 1000)
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
  async getPriceByMintAddress(
    mintAddress: string,
  ): Promise<number | undefined> {
    try {
      const local = await this.cache.get<number | undefined>(
        `price:${mintAddress}`,
      )
      if (local) return local
      const {
        data: {
          data: {
            [mintAddress]: { price },
          },
        },
      } = await axios.get<{
        data: Record<string, { price: number }>
        timeTake: number
      }>(`https://price.jup.ag/v4/price?ids=${mintAddress}`)
      if (price !== undefined)
        this.cache.set(`price:${mintAddress}`, price, this.cacheTTL)
      return price
    } catch (er) {
      return undefined
    }
  }
}
