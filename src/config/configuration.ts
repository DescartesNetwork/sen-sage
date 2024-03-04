import ip from 'ip'

const env = process.env.NODE_ENV || 'development'
const isDev = env === 'development'

const configuration = () => ({
  server: {
    env,
    port: parseInt(process.env.PORT, 10) || 10000,
    ip: ip.address(),
    host: process.env.HOST || '',
  },
  throttler: {
    ttl: 1000,
    limit: 10,
  },
  solana: {
    balansol: 'D3BBjqUdCYuP18fNvvMbPAZ8DpcRi4io2EsYHQawJDag',
    heliusApiToken: process.env.HELIUS_API_KEY || '',
  },
  cache: {
    items: 100000,
    path: isDev ? 'cache' : '/var/data/cache',
  },
})

export type EnvironmentVariables = ReturnType<typeof configuration>

export default configuration
