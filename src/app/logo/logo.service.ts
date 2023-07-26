import { Injectable } from '@nestjs/common'
import { SplService } from 'providers/spl/spl.service'

@Injectable()
export class LogoService {
  constructor(private readonly spl: SplService) {}

  async getLogoByMintAddress(mintAddress: string) {
    const data = await this.spl.getImageByMintAddress(mintAddress)
    return data
  }
}
