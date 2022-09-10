import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RedisService } from 'src/redis/redis.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './entities/user.entity';
import UserEntity from 'src/entities/user.entity';
import { RedisModule } from 'src/redis/redis.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
// import { KafkaProducerService } from 'src/kafka/producer/producer.service';

@Module({
  imports: [
    RedisModule,
    TypeOrmModule.forFeature([UserEntity]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    RedisService,
    //  KafkaProducerService
  ],
})
export class UserModule {}
