import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ConsumerService } from './consumer.service';

@Controller()
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @MessagePattern('__consumer_offsets')
  create(data: any) {
    console.log(data);
    return 'test';
  }
}
