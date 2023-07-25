import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class PriceService {
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
    { atomicAddresses = [] }: { atomicAddresses?: string[] },
  ) {
    const price = await this.getPriceViaJupiter(mintAddress)
    return price
  }
}
