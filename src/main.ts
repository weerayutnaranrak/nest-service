import { ValidationPipe } from '@nestjs/common';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Service example')
    .setDescription('The service API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.KAFKA,
  //     options: {
  //       client: {
  //         brokers: [
  //           // 'moped-01.srvs.cloudkafka.com:9094',
  //           // 'moped-02.srvs.cloudkafka.com:9094',
  //           // 'moped-03.srvs.cloudkafka.com:9094',
  //           'pkc-ldvr1.asia-southeast1.gcp.confluent.cloud:9092',
  //         ],
  //       },
  //       consumer: {
  //         groupId: 'billing-consumer',
  //       },
  //     },
  //   },
  // );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
