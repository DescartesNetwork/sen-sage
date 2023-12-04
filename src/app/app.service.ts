import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager'
import { Injectable, Inject } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  ThrottlerModuleOptions,
  ThrottlerOptionsFactory,
} from '@nestjs/throttler'
import fsStore from 'cache-manager-fs-hash'

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService
  public createThrottlerOptions(): ThrottlerModuleOptions {
    return {
      ttl: this.config.get('throttler.ttl', { infer: true }),
      limit: this.config.get('throttler.limit', { infer: true }),
    }
  }
}

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService
  public createCacheOptions(): CacheModuleOptions {
    return {
      store: fsStore,
      max: this.config.get('cache.items', { infer: true }),
      path: this.config.get('cache.path', { infer: true }),
      zip: true,
    }
  }
}
