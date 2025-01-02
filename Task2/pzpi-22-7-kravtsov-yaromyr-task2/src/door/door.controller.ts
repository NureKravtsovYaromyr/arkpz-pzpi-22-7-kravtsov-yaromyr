import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DoorService } from './door.service';
import { Roles } from 'src/role/roles-auth-decorator';
import { RoleGuard } from 'src/role/role.gurard';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateDoorDto } from './dto/create-door.dto';
import { EditDoorDto } from './dto/edit-door.dto';
import { VerifyUserDto } from './dto/verify-user.dto';

@Controller('door')
export class DoorController {
    constructor(private doorService: DoorService) { }

    @Roles(['building-admin'])
    @UseGuards(RoleGuard)
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

    @Roles(['building-admin'])
    @UseGuards(RoleGuard)
    @Put('')
    @ApiOperation({ summary: 'Edit door' })
    @ApiBody({ type: EditDoorDto })
    async editDoor(@Body() dto: EditDoorDto) {
        return await this.doorService.editDoor(dto);
    }

    //TODO 
    //Додавання доступу до двері користувачу будівлі
    //Видалення доступу до двері користувачу будівлі

    @Roles(['building-admin'])
    @UseGuards(RoleGuard)
    @Get('/:id')
    @ApiOperation({ summary: 'Create new building' })
    @ApiParam({ name: 'id', type: 'string' })
    async getDoor(@Param('id') id: string) {
        return await this.doorService.getDoor(Number(id));
    }


    @Roles(['building-admin'])
    @UseGuards(RoleGuard)
    @Get('/:id/user')
    @ApiOperation({ summary: 'Create new building' })
    @ApiParam({ name: 'id', type: 'string' })
    async getUserDoors(@Param('id') id: string) {
        return await this.doorService.getUserDoors(Number(id));
    }


    @UseGuards(RoleGuard)
    @Delete('/:id')
    @ApiOperation({ summary: 'Create new building' })
    @ApiParam({ name: 'id', type: 'string' })
    async deleteDoor(@Param('id') id: string) {
        return await this.doorService.deleteDoor(Number(id));
    }


    @Roles(['building-user'])
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
}
