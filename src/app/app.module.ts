import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { CacheModule } from '@nestjs/cache-manager'

import { CacheConfigService, ThrottlerConfigService } from './app.service'
import { MplModule } from 'providers/mpl/mpl.module'
import { SplModule } from 'providers/spl/spl.module'
import { BalansolModule } from 'providers/balansol/balansol.module'
import { JupagModule } from 'providers/jupag/jupag.module'
import { LegacyModule } from 'providers/legacy/legacy.module'

import { HealthModule } from './health/health.module'
import { MetadataModule } from './metadata/metadata.module'
import { PriceModule } from './price/price.module'
import { LogoModule } from './logo/logo.module'
import { StorageModule } from './storage/storage.module'

import configuration from 'config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ThrottlerModule.forRootAsync({ useClass: ThrottlerConfigService }),
    CacheModule.registerAsync({ isGlobal: true, useClass: CacheConfigService }),
    MplModule.forRoot({ isGlobal: true }),
    SplModule.forRoot({ isGlobal: true }),
    BalansolModule.forRoot({ isGlobal: true }),
    JupagModule.forRoot({ isGlobal: true }),
    LegacyModule.forRoot({ isGlobal: true }),
    HealthModule,
    MetadataModule,
    PriceModule,
    BalansolModule,
    LogoModule,
    StorageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
