import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
  

  ],
  controllers: [AppController],
  providers: [AppService,  ChatGateway],
})
export class AppModule { }


// TypeOrmModule.forRootAsync({
//   imports: [ConfigModule],
//   useFactory: (configService: ConfigService) => ({
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username:"root",
//     password: "",
//     database: "todo",
//     entities: [],
//     synchronize: false
//   }),
//   inject: [ConfigService]
// })
