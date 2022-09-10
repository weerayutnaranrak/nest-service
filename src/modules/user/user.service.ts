import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import UserEntity from 'src/entities/user.entity';
// import { KafkaProducerService } from 'src/kafka/producer/producer.service';
import { RedisService } from 'src/redis/redis.service';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private redisService: RedisService,
    // private producer: KafkaProducerService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.save(createUserDto);
    await this.redisService.del('user');
    // const user = await this.userModel.create(createUserDto);
    return user;
  }

  async findAll() {
    // await this.redisService.reset();
    // let user = await this.redisService.get('user');
    // if (!user) {
    //   user = await this.userModel.find();
    //   await this.redisService.set('user', user);
    // }
    // this.producer.publish('__consumer_offsets', 'value ..........');
    let user = await this.redisService.get('user');
    if (!user) {
      console.log('loging ...');
      user = await this.usersRepository.find();
      await this.redisService.set('user', user);
    }

    return user;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.find({
      where: {
        id: +id,
      },
    });
    // const user = await this.userModel.findById(id);
    return user[0];
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.update(id, updateUserDto);
    // const user = await this.userModel.findByIdAndUpdate(id, updateUserDto);
    await this.redisService.del('user');
    return user;
  }
  async remove(id: string) {
    const user = await this.usersRepository.delete(id);

    // const user = await this.userModel.findByIdAndDelete(id);
    await this.redisService.del('user');
    return user;
  }
}
