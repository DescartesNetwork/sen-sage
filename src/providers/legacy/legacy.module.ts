import { DynamicModule, Module } from '@nestjs/common'
import { LegacyService } from './legacy.service'

@Module({
  imports: [],
  providers: [LegacyService],
  exports: [LegacyService],
})
export class LegacyModule {
  static forRoot({ isGlobal = false }: { isGlobal?: boolean }): DynamicModule {
    return {
      module: LegacyModule,
      global: isGlobal,
    }
  }
}
