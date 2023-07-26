import { DynamicModule, Module } from '@nestjs/common'
import { SplService } from './spl.service'
import { CacheModule } from '@nestjs/cache-manager'

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 24 * 60 * 60 * 1000,
      max: 100000,
    }),
  ],
  providers: [SplService],
  exports: [SplService],
})
export class SplModule {
  static forRoot({ isGlobal = false }: { isGlobal?: boolean }): DynamicModule {
    return {
      module: SplModule,
      global: isGlobal,
    }
  }
}
