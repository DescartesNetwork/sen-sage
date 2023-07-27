import { DynamicModule, Module } from '@nestjs/common'
import { BalansolService } from './balansol.service'
import { CacheModule } from '@nestjs/cache-manager'

@Module({
  imports: [CacheModule.register({ isGlobal: true, max: 100000 })],
  providers: [BalansolService],
  exports: [BalansolService],
})
export class BalansolModule {
  static forRoot({ isGlobal = false }: { isGlobal?: boolean }): DynamicModule {
    return {
      module: BalansolModule,
      global: isGlobal,
    }
  }
}
