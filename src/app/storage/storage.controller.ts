import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import configuration from 'config/configuration'
import { StorageService } from './storage.service'

const {
  storage: { maxSize },
} = configuration()

@Controller('/storage')
export class StorageController {
  constructor(private readonly service: StorageService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: maxSize } }))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.service.upload(file)
  }
}
