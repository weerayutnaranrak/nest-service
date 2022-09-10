import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, logLevel } from 'kafkajs';

@Injectable()
export class KafkaProducerService
  implements OnModuleInit, OnApplicationShutdown
{
  private readonly kafkaInstance: Kafka;
  private producer: Producer;

  constructor() {
    this.kafkaInstance = new Kafka({
      clientId: 'service',
      brokers: ['localhost:9092'],
      logLevel: logLevel.INFO,
      //   connectionTimeout: connectionTimeout,
      //   authenticationTimeout: authenticationTimeout,
      //   reauthenticationThreshold: reauthenticationThreshold,
    });

    this.producer = this.kafkaInstance.producer();
  }

  async publish(message: any, kafkaTopic: string): Promise<void> {
    await this.producer.connect();
    await this.producer.send({
      topic: kafkaTopic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }
  async onModuleInit() {
    await this.producer.connect();
  }
}
