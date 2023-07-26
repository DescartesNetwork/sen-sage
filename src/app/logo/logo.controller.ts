import {
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Param,
  StreamableFile,
} from '@nestjs/common'
import { LogoService } from './logo.service'
import { isAddress } from 'helpers/utils'

@Controller('logo')
export class LogoController {
  constructor(private readonly service: LogoService) {}

  @Get(':filename')
  @Header('Content-Type', 'image/webp')
  async getLogoByMintAddress(@Param('filename') filename: string) {
    const [mintAddress, ext] = filename.split('.')
    console.log(mintAddress, ext)
    if (!isAddress(mintAddress) || ext.toLowerCase() !== 'webp')
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
    const data = await this.service.getLogoByMintAddress(mintAddress)
    if (!data) throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    return new StreamableFile(data)
  }
}
