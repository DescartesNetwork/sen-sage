import ip from 'ip'

const env = process.env.NODE_ENV || 'development'

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
    path: 'cache',
  },
  storage: {
    maxSize: 5000000, // 5MB
    region: 'us-west-2',
    bucket: 'sen-storage',
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY || '',
  },
})

export type EnvironmentVariables = ReturnType<typeof configuration>

export default configuration
