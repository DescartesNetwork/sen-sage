import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { ThrottlerModule } from '@nestjs/throttler'
import { ThrottlerConfigService } from './app.service'
import { MplModule } from 'providers/mpl/mpl.module'
import { SplModule } from 'providers/spl/spl.module'
import { BalansolModule } from 'providers/balansol/balansol.module'
import { JupagModule } from 'providers/jupag/jupag.module'
import { HealthModule } from './health/health.module'
import { MetadataModule } from './metadata/metadata.module'
import { PriceModule } from './price/price.module'
import { LogoModule } from './logo/logo.module'
import configuration from 'config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ThrottlerModule.forRootAsync({ useClass: ThrottlerConfigService }),
    ScheduleModule.forRoot(),
    MplModule.forRoot({ isGlobal: true }),
    SplModule.forRoot({ isGlobal: true }),
    BalansolModule.forRoot({ isGlobal: true }),
    JupagModule.forRoot({ isGlobal: true }),
    HealthModule,
    MetadataModule,
    PriceModule,
    BalansolModule,
    LogoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
