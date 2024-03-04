import { Connection } from '@solana/web3.js'

export const connection = (heliusApiToken: string) =>
  new Connection(`https://mainnet.helius-rpc.com/?api-key=${heliusApiToken}`)
