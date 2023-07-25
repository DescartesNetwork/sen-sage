import { Transform } from 'class-transformer'
import { IsArray, IsNumber, IsOptional } from 'class-validator'
import { IsSolanaAddress } from 'decorators/address.decorator'

export class GetPriceDto {
  @IsOptional()
  @IsArray()
  @IsSolanaAddress({ each: true })
  @Transform(({ value }: { value: string }) => value.split(','))
  atomicAddresses?: string[]

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Transform(({ value }: { value: string }) =>
    value.split(',').map((e) => Number(e)),
  )
  weights?: number[]
}
