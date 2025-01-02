import { Injectable } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Building } from './building.model';
import { UpdateBuildingDto } from './dto/update-building.dto';

@Injectable()
export class BuildingService {
    constructor(  @InjectModel(Building) private buildingRepository: typeof Building){}

    // Create
    async createBuilding(dto: CreateBuildingDto) {
        await this.buildingRepository.create(dto);
    }

    // Read All
    async getAllBuildings() {
        console.log('getAllBuildings');
    }

    // Read One
    async getBuildingById(id: string) {
        console.log('getBuildingById');
    }

    // Update
    async updateBuilding(id: string, dto: UpdateBuildingDto) {
        console.log('updateBuilding');
    }

    // Delete
    async deleteBuilding(id: string) {
        console.log('deleteBuilding');
    }
}
