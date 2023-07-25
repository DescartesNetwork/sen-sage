import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import axios from 'axios'
import { Cache } from 'cache-manager'

@Injectable()
export class PriceService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  private async getPriceViaJupiter(mintAddress: string) {
    try {
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
      return price
    } catch (er) {
      return undefined
    }
  }

  async getPricetByMintAddress(
    mintAddress: string,
    {
      atomicAddresses = [],
      weights = [],
    }: { atomicAddresses?: string[]; weights?: number[] },
  ) {
    console.log(atomicAddresses, weights)
    const local = await this.cache.get(mintAddress)
    if (local) return local
    const price = await this.getPriceViaJupiter(mintAddress)
    await this.cache.set(mintAddress, price)
    return price
  }
}
