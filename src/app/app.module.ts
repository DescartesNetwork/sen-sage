import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { ThrottlerModule } from '@nestjs/throttler'
import { ThrottlerConfigService } from './app.service'
import { HealthModule } from './health/health.module'
import configuration from 'config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ThrottlerModule.forRootAsync({
      useClass: ThrottlerConfigService,
    }),
    ScheduleModule.forRoot(),
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
