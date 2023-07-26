import { Controller, Get, Param } from '@nestjs/common'
import { ParseSolanaAddressPipe } from 'pipelines/address.pipeline'
import { MetadataService } from './metadata.service'

@Controller('metadata')
export class MetadataController {
  constructor(private readonly service: MetadataService) {}

  @Get(':mintAddress')
  async getMintMetadata(
    @Param('mintAddress', ParseSolanaAddressPipe) mintAddress: string,
  ) {
    const mint = await this.service.getMintByAddress(mintAddress)
    return mint
  }
}
