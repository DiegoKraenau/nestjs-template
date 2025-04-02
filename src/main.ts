import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerService } from './shared/services';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  const logger = new Logger();

  app.useGlobalPipes(new ValidationPipe());

  const swaggerService = app.get(SwaggerService);
  swaggerService.setup(app);

  await app.listen(3000);

  logger.log(`Server rendering in ${await app.getUrl()}`);
  logger.log(`Environment: ${process.env.NODE_ENV}`);
}
bootstrap();
