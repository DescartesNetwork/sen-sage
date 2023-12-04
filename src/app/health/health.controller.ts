import { Controller, Get } from '@nestjs/common'
import { HealthService } from './health.service'

@Controller('health')
export class HealthController {
  constructor(private readonly service: HealthService) {}

  @Get()
  checkConnection(): string {
    return this.service.check()
  }
}
