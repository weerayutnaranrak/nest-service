import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from './database/mongo.module';
import { PostgresModule } from './database/postgres.module';
import { UserModule } from './modules/user/user.module';
// import { ConsumerModule } from './kafka/consumer/consumer.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    PostgresModule,
    MongoModule,
    UserModule,
    ProductModule,
    // ConsumerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
