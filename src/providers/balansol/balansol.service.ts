import { AnchorProvider, Program, Wallet } from '@coral-xyz/anchor'
import { BalancerAmm, IDL } from './balansol.abi'
import { Keypair } from '@solana/web3.js'
import configuration, { EnvironmentVariables } from 'config/configuration'
import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import BN from 'bn.js'
import { undecimalize } from 'helpers/decimals'
import { MintMetadata } from 'providers/jupag/jupag.service'
import { SplService } from 'providers/spl/spl.service'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { connection } from 'helpers/connection'

@Injectable()
export class BalansolService extends Program<BalancerAmm> {
  private readonly cacheTTL: number = 60 * 60

  constructor(
    private readonly config: ConfigService<EnvironmentVariables>,
    @Inject(CACHE_MANAGER) private cache: Cache,
    @Inject(forwardRef(() => SplService))
    private readonly spl: SplService,
  ) {
    super(
      IDL,
      configuration().solana.balansol,
      new AnchorProvider(
        connection(
          config.get('solana.ankr', {
            infer: true,
          }),
        ),
        new Wallet(new Keypair()),
        { commitment: 'confirmed' },
      ),
    )
  }

  private async recursiveMintPriceByAddress(mintAddress: string) {
    const { data: price } = await axios.get<number>(
      `http://localhost:${this.config.get('server.port', {
        infer: true,
      })}/price/${mintAddress}`,
    )
    return price
  }

  private async recursiveMintMetadataByAddress(mintAddress: string) {
    const { data: price } = await axios.get<MintMetadata>(
      `http://localhost:${this.config.get('server.port', {
        infer: true,
      })}/metadata/${mintAddress}`,
    )
    return price
  }

  /**
   * Get all available pool
   * @returns List of pools
   */
  async getAllPools() {
    const pools = await this.account.pool.all()
    return pools
  }

  /**
   * Get a pool by LP address
   * @param lpAddress LP address
   * @returns Pool
   */
  async getPoolByLpAddress(lpAddress: string) {
    const pools = await this.account.pool.all()
    const pool = pools.find(
      ({ account: { mintLpt } }) => mintLpt.toBase58() === lpAddress,
    )
    return pool
  }

  /**
   * Get LP price
   * @param lpAddress LP address
   * @returns Price
   */
  async getPriceByLpAddress(lpAddress: string): Promise<number | undefined> {
    try {
      const local = await this.cache.get<number | undefined>(
        `price:${lpAddress}`,
      )
      if (local) return local
      const {
        account: { mints, weights, reserves },
      } = await this.getPoolByLpAddress(lpAddress)

      const amountBasedOnFirstMint = reserves.reduce(
        (a, b, i) =>
          a.add(
            reserves[0].mul(weights[i]).div(reserves[i]).div(weights[0]).mul(b),
          ),
        new BN(0),
      )
      const firstMintPrice = await this.recursiveMintPriceByAddress(
        mints[0].toBase58(),
      )
      const { decimals: firstMintDecimals } =
        await this.recursiveMintMetadataByAddress(mints[0].toBase58())
      const tvl =
        Number(undecimalize(amountBasedOnFirstMint, firstMintDecimals)) *
        firstMintPrice

      const { supply: lpSupply, decimals: lpDecimals } =
        await this.spl.program.account.mint.fetch(lpAddress)
      const lpAmount = Number(undecimalize(lpSupply, lpDecimals))

      const price = lpAmount ? tvl / lpAmount : undefined
      if (price)
        await this.cache.set(`price:${lpAddress}`, price, {
          ttl: this.cacheTTL,
        })
      return price
    } catch (er) {
      return undefined
    }
  }
}
