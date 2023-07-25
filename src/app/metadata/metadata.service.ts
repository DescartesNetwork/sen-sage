import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import { PublicKey } from '@solana/web3.js'
import { MPL_SERVICE, MplService } from 'app/mpl/mpl.service'
import { SPL_SERVICE, SplService } from 'app/spl/spl.service'
import axios from 'axios'
import { Cache } from 'cache-manager'
import { shortenAddress } from 'helpers/utils'

export type ChainId = 101 | 102 | 103
export type MintMetadata = {
  address: string
  chainId: ChainId
  decimals: number
  name: string
  symbol: string
  logoURI: string
  tags: string[]
  extensions: {
    coingeckoId?: string
  }
}

@Injectable()
export class MetadataService {
  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache,
    @Inject(MPL_SERVICE) private readonly mpl: MplService,
    @Inject(SPL_SERVICE) private readonly spl: SplService,
  ) {}

  private async getMintViaJupiter(mintAddress: string) {
    try {
      const { data } = await axios.get<MintMetadata[]>(
        'https://token.jup.ag/all',
      )
      return data.find(({ address }) => address === mintAddress)
    } catch (er) {
      return undefined
    }
  }

  private async getMintViaMetaplex(mintAddress: string): Promise<MintMetadata> {
    try {
      const {
        mint: { decimals },
        name,
        symbol,
        json,
      } = await this.mpl
        .nfts()
        .findByMint({ mintAddress: new PublicKey(mintAddress) })
      return {
        address: mintAddress,
        chainId: 101,
        decimals,
        name,
        symbol,
        logoURI: json?.image || '',
        tags: ['metaplex', 'sft'],
        extensions: {},
      }
    } catch (er) {
      return undefined
    }
  }

  private async getMintViaTokenProgram(
    mintAddress: string,
  ): Promise<MintMetadata> {
    try {
      const { decimals } = await this.spl.account.mint.fetch(mintAddress)
      return {
        address: mintAddress,
        chainId: 101,
        decimals: decimals,
        name: shortenAddress(mintAddress),
        symbol: mintAddress.substring(0, 6),
        logoURI: '',
        tags: ['spl'],
        extensions: {},
      }
    } catch (er) {
      return undefined
    }
  }

  async getMintByAddress(mintAddress: string) {
    const local = await this.cache.get(mintAddress)
    if (local) return local
    const mint =
      (await this.getMintViaJupiter(mintAddress)) ||
      (await this.getMintViaMetaplex(mintAddress)) ||
      (await this.getMintViaTokenProgram(mintAddress))
    await this.cache.set(mint.address, mint)
    return mint
  }
}
