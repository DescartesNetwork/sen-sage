import { DynamicModule, Module } from '@nestjs/common'
import { MplService } from './mpl.service'

@Module({
  imports: [],
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
