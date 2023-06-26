import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
    credentials: true});
  // app.use(cors());
  // app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.APP_PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
