import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DoorService } from './door.service';
import { Roles } from 'src/role/roles-auth-decorator';
import { RoleGuard } from 'src/role/role.gurard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateDoorDto } from './dto/create-door.dto';
import { EditDoorDto } from './dto/edit-door.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { GrantAccessDto } from './dto/grant-access.dto';

@Controller('door')
export class DoorController {
    constructor(private doorService: DoorService) { }

    @ApiBearerAuth('bearer') // Связка со Swagger
    @Roles(['building-admin','system-admin'])
    @UseGuards(RoleGuard)
    @ApiBearerAuth('bearer')
    @Post('')
    @ApiOperation({ summary: 'Create new door' })
    @ApiBody({ type: CreateDoorDto })
    async createDoor(@Body() dto: CreateDoorDto) {
        try {
            
            return await this.doorService.createDoor(dto);

        } catch (error) {
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @ApiBearerAuth('bearer') // Связка со Swagger
    @Roles(['building-user','system-admin'])
    @UseGuards(RoleGuard)
    @Post('/verify-user')
    @ApiOperation({ summary: 'Verify user for specific door' })
    @ApiBody({ type: VerifyUserDto, description: 'User verification data' })
    async verifyUserForDoor(@Param('id') id: string, @Body() dto: VerifyUserDto) {
     
        try{
            console.log('verifyUserForDoor')
            return await this.doorService.verifyUserForDoor(dto);
        }
         catch (error) {
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @ApiBearerAuth('bearer') // Связка со Swagger
    @Roles(['building-admin','system-admin'])
    @UseGuards(RoleGuard)
    @ApiBearerAuth('bearer')
    @Put('')
    @ApiOperation({ summary: 'Edit door' })
    @ApiBody({ type: EditDoorDto })
    async editDoor(@Body() dto: EditDoorDto) {
        try{
            return await this.doorService.editDoor(dto);
        }catch (error) {
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        
    }

    @ApiBearerAuth('bearer') // Связка со Swagger
    @Roles(['building-admin','system-admin'])
    @UseGuards(RoleGuard)
    @ApiBearerAuth('bearer')
    @Put(':id/grant-access')
    @ApiParam({ name: 'id', type: 'string', description: 'Door ID' })
    @ApiBody({ type: GrantAccessDto, description: 'User access data' })
    async grantAccessToDoor(@Param('id') id: string, @Body() dto: GrantAccessDto) {
        try{
            return await this.doorService.grantAccessToDoor(Number(id), dto);
        }catch (error) {
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        
    }


    @ApiBearerAuth('bearer') // Связка со Swagger
    @Roles(['building-admin','system-admin'])
    @UseGuards(RoleGuard)
    @ApiBearerAuth('bearer')
    @Get('/:id')
    @ApiOperation({ summary: 'Get door by id' })
    @ApiParam({ name: 'id', type: 'string' })
    async getDoor(@Param('id') id: string) {
        return await this.doorService.getDoor(Number(id));
    }


    @ApiBearerAuth('bearer') // Связка со Swagger
    @Roles(['building-admin','system-admin'])
    @UseGuards(RoleGuard)
    @ApiBearerAuth('bearer')
    @Get('/:id/user')
    @ApiOperation({ summary: 'Get door by user id' })
    @ApiParam({ name: 'id', type: 'string' })
    async getUserDoors(@Param('id') id: string) {
        return await this.doorService.getUserDoors(Number(id));
    }

    @UseGuards(RoleGuard)
    @Delete('/:id')
    @ApiBearerAuth('bearer')
    @ApiOperation({ summary: 'Delete door by id' })
    @ApiParam({ name: 'id', type: 'string' })
    async deleteDoor(@Param('id') id: string) {
        return await this.doorService.deleteDoor(Number(id));
    }


   
}
