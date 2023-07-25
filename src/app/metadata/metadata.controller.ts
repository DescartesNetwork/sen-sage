import { Controller, Get, Param, Query } from '@nestjs/common'
import { ParseSolanaAddressPipe } from 'pipelines/address.pipeline'
import { GetMetadataDto } from './metadata.dto'
import { MetadataService } from './metadata.service'

@Controller('metadata')
export class MetadataController {
  constructor(private readonly service: MetadataService) {}

  @Get(':mintAddress')
  async getMintMetadata(
    @Param('mintAddress', ParseSolanaAddressPipe) mintAddress: string,
    @Query() { atomicAddresses }: GetMetadataDto,
  ) {
    const mint = await this.service.getMintByAddress(mintAddress, {
      atomicAddresses,
    })
    return mint
  }
}
