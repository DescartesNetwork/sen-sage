import { Controller, Get, Param, Query } from '@nestjs/common'
import { ParseSolanaAddressPipe } from 'pipelines/address.pipeline'
import { GetPriceDto } from './price.dto'
import { PriceService } from './price.service'

@Controller('price')
export class PriceController {
  constructor(private readonly service: PriceService) {}

  @Get(':mintAddress')
  async getMintPrice(
    @Param('mintAddress', ParseSolanaAddressPipe) mintAddress: string,
    @Query() { atomicAddresses }: GetPriceDto,
  ) {
    const price = await this.service.getPricetByMintAddress(mintAddress, {
      atomicAddresses,
    })
    return price
  }
}
