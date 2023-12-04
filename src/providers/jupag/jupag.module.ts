import { DynamicModule, Module } from '@nestjs/common'
import { JupagService } from './jupag.service'

@Module({
  imports: [],
  providers: [JupagService],
  exports: [JupagService],
})
export class JupagModule {
  static forRoot({ isGlobal = false }: { isGlobal?: boolean }): DynamicModule {
    return {
      module: JupagModule,
      global: isGlobal,
    }
  }
}
