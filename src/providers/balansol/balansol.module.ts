import { DynamicModule, Module } from '@nestjs/common'
import { BalansolService } from './balansol.service'

@Module({
  imports: [],
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
