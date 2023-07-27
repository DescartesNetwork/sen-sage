import { Injectable } from '@nestjs/common'
import { BalansolService } from 'providers/balansol/balansol.service'
import { JupagService } from 'providers/jupag/jupag.service'

@Injectable()
export class PriceService {
  constructor(
    private readonly jupag: JupagService,
    private readonly balansol: BalansolService,
  ) {}

  async getPriceByMintAddress(mintAddress: string) {
    const price =
      (await this.jupag.getPriceByMintAddress(mintAddress)) ||
      (await this.balansol.getPriceByLpAddress(mintAddress))
    return price
  }
}
