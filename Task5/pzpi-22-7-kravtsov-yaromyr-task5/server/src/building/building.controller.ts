import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { RoleGuard } from 'src/role/role.gurard';
import { Roles } from 'src/role/roles-auth-decorator';
import { CreateBuildingDto } from './dto/create-building.dto';
import { BuildingService } from './building.service';
import { get } from 'http';
import { UpdateBuildingDto } from './dto/update-building.dto';

@Controller('building')
export class BuildingController {

    constructor(private buildingService: BuildingService) { }

    @ApiBearerAuth('bearer') // Связка со Swagger
    @Roles(['system-admin'])
    @UseGuards(RoleGuard)
    @Post('')
    @ApiOperation({ summary: 'Create new building' })
    @ApiBody({ type: CreateBuildingDto })
    async createBuilding(@Body() dto: CreateBuildingDto) {
        try {
            return await this.buildingService.createBuilding(dto);
        } catch (error) {
            console.log(error);
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }


    @ApiBearerAuth('bearer') // Связка со Swagger
    @Roles(['system-admin'])
    @UseGuards(RoleGuard)
    @Get('')
    @ApiOperation({ summary: 'Get all buildings' })
    async getAllBuildings() {
        try {
            return await this.buildingService.getAllBuildings();
        } catch (error) {
            console.log(error);
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

    }


    @ApiBearerAuth('bearer') // Связка со Swagger
    @Roles(['system-admin'])
    @UseGuards(RoleGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Get building by ID' })
    @ApiBearerAuth('bearer')
    @ApiParam({ name: 'id', type: 'string' })
    async getBuildingById(@Param('id') id: string) {
        try {
            return await this.buildingService.getBuildingById(id);
        } catch (error) {
            console.log(error);
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

    }


    @ApiBearerAuth('bearer') // Связка со Swagger
    @Roles(['system-admin'])
    @UseGuards(RoleGuard)
    @Put(':id')
    @ApiOperation({ summary: 'Update building by ID' })
    @ApiBearerAuth('bearer')
    @ApiParam({ name: 'id', type: 'string' })
    @ApiBody({ type: UpdateBuildingDto })
    async updateBuilding(@Body() dto: UpdateBuildingDto) {
        try {
            return await this.buildingService.updateBuilding(dto);
        } catch (error) {
            console.log(error);
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }


    @ApiBearerAuth('bearer') // Связка со Swagger
    @Roles(['system-admin'])
    @UseGuards(RoleGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete building by ID' })
    @ApiBearerAuth('bearer')
    @ApiParam({ name: 'id', type: 'number' })
    async deleteBuilding(@Param('id') id: string) {
        try {
            return await this.buildingService.deleteBuilding(id);
        } catch (error) {
            console.log(error);
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

}
