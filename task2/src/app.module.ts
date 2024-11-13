import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { config } from 'dotenv';
config();
@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_EXTERN),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserEntity]
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
