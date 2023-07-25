import { DynamicModule, Module } from '@nestjs/common'
import { SplServiceFactory } from './spl.service'

@Module({
  providers: [SplServiceFactory],
  exports: [SplServiceFactory],
})
export class SplModule {
  static forRoot({ isGlobal = false }: { isGlobal?: boolean }): DynamicModule {
    return {
      module: SplModule,
      global: isGlobal,
    }
  }
}
