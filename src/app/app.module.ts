import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CacheModule } from '@nestjs/cache-manager'
import { ScheduleModule } from '@nestjs/schedule'
import { ThrottlerModule } from '@nestjs/throttler'
import { ThrottlerConfigService } from './app.service'
import { MplModule } from './mpl/mpl.module'
import { SplModule } from './spl/spl.module'
import { HealthModule } from './health/health.module'
import { MetadataModule } from './metadata/metadata.module'
import { PriceModule } from './price/price.module'
import configuration from 'config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    CacheModule.register({ isGlobal: true, ttl: 24 * 60 * 60, max: 100000 }),
    ThrottlerModule.forRootAsync({
      useClass: ThrottlerConfigService,
    }),
    ScheduleModule.forRoot(),
    MplModule.forRoot({ isGlobal: true }),
    SplModule.forRoot({ isGlobal: true }),
    HealthModule,
    MetadataModule,
    PriceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
