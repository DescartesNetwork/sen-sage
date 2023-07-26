import { AnchorProvider, Program, Wallet } from '@coral-xyz/anchor'
import { BalancerAmm, IDL } from './balansol.abi'
import { Connection, Keypair } from '@solana/web3.js'
import configuration, { EnvironmentVariables } from 'config/configuration'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

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

  async getAllPools() {
    const pools = await this.account.pool.all()
    return pools
  }

  async getPoolByLpAddress(lpAddress: string) {
    const pools = await this.account.pool.all()
    const pool = pools.find(
      ({ account: { mintLpt } }) => mintLpt.toBase58() === lpAddress,
    )
    return pool
  }
}
