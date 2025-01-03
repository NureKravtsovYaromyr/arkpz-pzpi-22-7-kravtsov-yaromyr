import { Module } from '@nestjs/common';
import { BuildingController } from './building.controller';
import { BuildingService } from './building.service';
import { Building } from './building.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { DoorService } from 'src/door/door.service';
import { DoorModule } from 'src/door/door.module';

@Module({
  controllers: [BuildingController],
  imports: [SequelizeModule.forFeature([Building]), DoorModule],
  providers: [BuildingService],
})

export class BuildingModule {}
