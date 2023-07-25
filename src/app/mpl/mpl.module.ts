import { DynamicModule, Module } from '@nestjs/common'
import { MplServiceFactory } from './mpl.service'

@Module({
  providers: [MplServiceFactory],
  exports: [MplServiceFactory],
})
export class MplModule {
  static forRoot({ isGlobal = false }: { isGlobal?: boolean }): DynamicModule {
    return {
      module: MplModule,
      global: isGlobal,
    }
  }
}
