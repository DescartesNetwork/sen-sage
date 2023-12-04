import { DynamicModule, Module } from '@nestjs/common'
import { SplService } from './spl.service'

@Module({
  imports: [],
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
