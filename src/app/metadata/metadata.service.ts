import { Injectable } from '@nestjs/common'
import { JupagService } from 'providers/jupag/jupag.service'
import { MplService } from 'providers/mpl/mpl.service'
import { SplService } from 'providers/spl/spl.service'

@Injectable()
export class MetadataService {
  constructor(
    private readonly mpl: MplService,
    private readonly spl: SplService,
    private readonly jupag: JupagService,
  ) {}

  /**
   * Get mint metadata
   * @param mintAddress Mint address
   * @returns Mint
   */
  async getMintByAddress(mintAddress: string) {
    const mint =
      (await this.jupag.getMintByAddress(mintAddress)) ||
      (await this.mpl.getMintByAddress(mintAddress)) ||
      (await this.spl.getMintByAddress(mintAddress))
    return mint
  }
}
