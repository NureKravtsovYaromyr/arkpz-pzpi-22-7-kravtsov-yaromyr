import { Module } from '@nestjs/common';


import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { User } from './user/user.model';


import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './token/token.module';
import { Token } from './token/token.model';
import { BuildingModule } from './building/building.module';

import { DoorModule } from './door/door.module';
import { AccessLogModule } from './access-log/access-log.module';
import { Building } from './building/building.model';

import { Door } from './door/door.model';
import { AccessLog } from './access-log/access-log.model';
import { DoorUser } from './door/door-users.model';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:`.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password:process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      models: [User,Token,Building,Door, DoorUser,AccessLog],
      autoLoadModels:  process.env.AUTO_LOAD_MODELS == 'true'
    }),
    UserModule,
    TokenModule,
    BuildingModule,
    DoorModule,
    AccessLogModule,
  ]
})
export class AppModule {}
