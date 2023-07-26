import { Controller, Get, Param } from '@nestjs/common'
import { ParseSolanaAddressPipe } from 'pipelines/address.pipeline'
import { PriceService } from './price.service'

@Controller('price')
export class PriceController {
  constructor(private readonly service: PriceService) {}

  @Get(':mintAddress')
  async getMintPrice(
    @Param('mintAddress', ParseSolanaAddressPipe) mintAddress: string,
  ) {
    const price = await this.service.getPriceByMintAddress(mintAddress)
    return price
  }
}
