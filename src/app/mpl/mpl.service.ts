import { Metaplex } from '@metaplex-foundation/js'
import { Connection } from '@solana/web3.js'
import configuration from 'config/configuration'

export const MPL_SERVICE = 'MplService'
export type MplService = Metaplex

export const MplServiceFactory = {
  provide: MPL_SERVICE,
  useValue: new Metaplex(
    new Connection(configuration().solana.cluster, 'confirmed'),
  ),
}
