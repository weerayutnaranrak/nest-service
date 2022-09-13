import { ValidationPipe } from '@nestjs/common';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ConfigService } from '@nestjs/config';
// import { ConsumerModule } from './kafka/consumer/consumer.module';
// const configService = new ConfigService();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Service example')
    .setDescription('The service API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8000);
  // const kafka = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   ConsumerModule,
  //   {
  //     transport: Transport.KAFKA,
  //     options: {
  //       client: {
  //         brokers: ['localhost:9092'],
  //       },
  //       consumer: {
  //         groupId: 'service-consumer',
  //       },
  //     },
  //   },
  // );
  // kafka.listen();
}
bootstrap();
