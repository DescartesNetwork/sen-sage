import ip from 'ip'
import { CronExpression } from '@nestjs/schedule'

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
    ttl: isDev ? 5 : 24 * 60 * 60,
    limit: isDev ? 3 : 10,
  },
  solana: {
    cluster: process.env.RPC || '',
    balansol: 'D3BBjqUdCYuP18fNvvMbPAZ8DpcRi4io2EsYHQawJDag',
  },
  schedule: {
    jupag: isDev
      ? CronExpression.EVERY_MINUTE
      : CronExpression.EVERY_10_MINUTES,
  },
  cache: {
    items: 100000,
    path: isDev ? 'cache' : '/var/data/cache',
  },
})

export type EnvironmentVariables = ReturnType<typeof configuration>

export default configuration
