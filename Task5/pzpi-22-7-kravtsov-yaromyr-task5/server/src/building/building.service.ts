import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Building } from './building.model';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { DoorService } from 'src/door/door.service';
import { GrantAccessDto } from 'src/door/dto/grant-access.dto';

@Injectable()
export class BuildingService {
    constructor(@InjectModel(Building) private buildingRepository: typeof Building,
    private doorService: DoorService
    ) { }

    async createBuilding(dto: CreateBuildingDto) {
        return await this.buildingRepository.create(dto);
    }


    async getAllBuildings() {
        return await this.buildingRepository.findAll();
    }

    async getBuildingById(id: string) {
        return await this.buildingRepository.findByPk(id);
    }

    async updateBuilding(dto: UpdateBuildingDto) {
        const building = await this.buildingRepository.findByPk(dto.buildingId);
        await building.update({
            comment: dto.comment,
            address: dto.address
        })
        return;
    }

    async deleteBuilding(id: string) {
        const building = await this.buildingRepository.findByPk(id);

        if(!building){
            throw new HttpException('11', HttpStatus.NOT_FOUND)
        }

        await this.doorService.deleteDoorsByBuilding(building.id);
        await building.destroy();
        return;
    }
}
