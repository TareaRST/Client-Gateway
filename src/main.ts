import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Main Gateway')


  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  
  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
  );

  app.useGlobalFilters(new RpcCustomExceptionFilter())

  const host = '0.0.0.0';

  await app.listen(envs.port, host);

  logger.log(`Gateway running on Port ${ envs.port }`);
}
bootstrap();
