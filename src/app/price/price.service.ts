import { Injectable } from '@nestjs/common'
import { JupagService } from 'providers/jupag/jupag.service'

@Injectable()
export class PriceService {
  constructor(private readonly jupag: JupagService) {}

  async getPriceByMintAddress(mintAddress: string) {
    const price = await this.jupag.getPriceByMintAddress(mintAddress)
    return price
  }
}
