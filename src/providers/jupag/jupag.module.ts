import { DynamicModule, Module } from '@nestjs/common'
import { JupagService } from './jupag.service'
import { CacheModule } from '@nestjs/cache-manager'

@Module({
  imports: [CacheModule.register({ isGlobal: true, max: 100000 })],
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
