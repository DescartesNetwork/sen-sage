import { AnchorProvider, Program, Wallet } from '@coral-xyz/anchor'
import { BalancerAmm, IDL } from './balansol.abi'
import { Connection, Keypair } from '@solana/web3.js'
import configuration, { EnvironmentVariables } from 'config/configuration'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import BN from 'bn.js'
import { decimalize, undecimalize } from 'helpers/decimals'

@Injectable()
export class BalansolService extends Program<BalancerAmm> {
  constructor(readonly config: ConfigService<EnvironmentVariables>) {
    super(
      IDL,
      configuration().solana.balansol,
      new AnchorProvider(
        new Connection(config.get('solana.cluster', { infer: true })),
        new Wallet(new Keypair()),
        { commitment: 'confirmed' },
      ),
    )
  }

  private async recursiveMintByAddress(mintAddress: string) {
    const { data: price } = await axios.get(
      `http://localhost:${this.config.get('server.port', {
        infer: true,
      })}/price/${mintAddress}`,
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
  async getPriceByLpAddress(lpAddress: string) {
    try {
      const {
        account: { mints, weights },
      } = await this.getPoolByLpAddress(lpAddress)
      const precision = 18
      const prices = await Promise.all(
        mints.map((mint) => this.recursiveMintByAddress(mint.toBase58())),
      )
      const _prices = prices.map((price) => decimalize(price, precision))
      const price = _prices
        .reduce((a, b, i) => b.mul(weights[i]).add(a), new BN(0))
        .div(weights.reduce((a, b) => a.add(b), new BN(0)))
      return Number(undecimalize(price, precision))
    } catch (er) {
      return undefined
    }
  }
}
