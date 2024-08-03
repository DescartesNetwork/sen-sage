import fs from 'fs'
import path from 'path'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from 'app/app.module'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import configuration from 'config/configuration'

async function bootstrap() {
  // Init
  const app = await NestFactory.create(AppModule)
  // Middleware
  app.enableCors({
    origin: [/^(http)[s]?:\/\/(localhost)(:[0-9]+)$/, /sentre\.io$/],
    credentials: true,
  })
  app.use(cookieParser())
  app.use(
    morgan('tiny', {
      skip: ({ url }) => url === '/health',
    }),
  )
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  // Swagger docs
  const { version, description, name } = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8'),
  )
  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
  // Start
  const { port: PORT, host: HOST } = configuration().server
  await app.listen(PORT, HOST)
  console.info(`⚡️[server]: Server is running at http://${HOST}:${PORT}`)
}

bootstrap()
