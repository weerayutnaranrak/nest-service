import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongoModule } from './database/mongo.module';
import { PostgresModule } from './database/postgres.module';
// import { RedisModule } from './redis/redis.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    // RedisModule,
    PostgresModule,
    MongoModule,
    // ClientsModule.register([
    //   {
    //     name: 'AUTH_SERVICE',
    //     transport: Transport.KAFKA,

    //     options: {
    //       client: {
    //         clientId: 'auth',
    //         brokers: [
    //           // 'moped-01.srvs.cloudkafka.com:9094',
    //           // 'moped-02.srvs.cloudkafka.com:9094',
    //           // 'moped-03.srvs.cloudkafka.com:9094',
    //           'pkc-ldvr1.asia-southeast1.gcp.confluent.cloud:9092',
    //         ],
    //       },
    //       consumer: {
    //         groupId: 'auth-consumer',
    //       },
    //     },
    //   },
    // ]),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
