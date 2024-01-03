import { Connection } from '@solana/web3.js'

export const connection = (ankr: string) =>
  new Connection(`https://rpc.ankr.com/solana/${ankr}`, {
    wsEndpoint: `https://rpc.ankr.com/solana/ws/${ankr}`,
  })
