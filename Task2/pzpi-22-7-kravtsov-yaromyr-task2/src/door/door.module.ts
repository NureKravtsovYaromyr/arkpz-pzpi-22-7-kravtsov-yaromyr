import { Module } from '@nestjs/common';
import { DoorService } from './door.service';
import { DoorController } from './door.controller';
import { Door } from './door.model';

import { SequelizeModule } from '@nestjs/sequelize';
import { DoorUser } from './door-users.model';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [DoorService],
  imports: [SequelizeModule.forFeature([Door, DoorUser]), UserModule],
  controllers: [DoorController]
})
export class DoorModule {}
