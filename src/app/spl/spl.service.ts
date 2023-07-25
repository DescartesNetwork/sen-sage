import { AnchorProvider, Wallet } from '@coral-xyz/anchor'
import { splTokenProgram } from '@coral-xyz/spl-token'
import { Connection, Keypair } from '@solana/web3.js'
import configuration from 'config/configuration'

export const SPL_SERVICE = 'SplService'
export type SplService = ReturnType<typeof splTokenProgram>

export const SplServiceFactory = {
  provide: SPL_SERVICE,
  useValue: splTokenProgram({
    provider: new AnchorProvider(
      new Connection(configuration().solana.cluster),
      new Wallet(new Keypair()),
      { commitment: 'confirmed' },
    ),
  }),
}
