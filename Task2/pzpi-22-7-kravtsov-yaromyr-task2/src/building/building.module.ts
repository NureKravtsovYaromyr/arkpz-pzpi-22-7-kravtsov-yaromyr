import { Module } from '@nestjs/common';
import { BuildingController } from './building.controller';
import { BuildingService } from './building.service';
import { Building } from './building.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [BuildingController],
  imports: [SequelizeModule.forFeature([Building])],
  providers: [BuildingService]
})
export class BuildingModule {}
