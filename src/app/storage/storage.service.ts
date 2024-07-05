import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EnvironmentVariables } from 'config/configuration'
import { toCID, toFilename, toUrl } from 'helpers/cid'

@Injectable()
export class StorageService {
  constructor(private readonly config: ConfigService<EnvironmentVariables>) {}

  private readonly region = this.config.get('storage.region', { infer: true })
  private readonly bucket = this.config.get('storage.bucket', { infer: true })
  private readonly accessKeyId = this.config.get('storage.accessKeyId', {
    infer: true,
  })
  private readonly secretAccessKey = this.config.get(
    'storage.secretAccessKey',
    { infer: true },
  )
  private readonly s3 = new S3Client({
    region: this.region,
    credentials: {
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
    },
  })

  async upload(file: Express.Multer.File) {
    const cid = toCID(file)
    const filename = toFilename(cid)
    const url = toUrl(cid, { bucket: this.bucket, region: this.region })
    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: filename,
        Body: file.buffer,
      }),
    )
    return { cid, filename, url }
  }
}
