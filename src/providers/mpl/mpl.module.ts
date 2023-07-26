import { DynamicModule, Module } from '@nestjs/common'
import { MplService } from './mpl.service'
import { CacheModule } from '@nestjs/cache-manager'

@Module({
  imports: [
    CacheModule.register({ isGlobal: true, ttl: 24 * 60 * 60, max: 100000 }),
  ],
  providers: [MplService],
  exports: [MplService],
})
export class MplModule {
  static forRoot({ isGlobal = false }: { isGlobal?: boolean }): DynamicModule {
    return {
      module: MplModule,
      global: isGlobal,
    }
  }
}
