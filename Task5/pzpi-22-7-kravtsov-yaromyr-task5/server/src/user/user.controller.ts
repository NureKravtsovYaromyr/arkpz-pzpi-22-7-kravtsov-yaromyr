import { Body, Controller, Delete, ForbiddenException, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { Roles } from 'src/role/roles-auth-decorator';
import { RoleGuard } from 'src/role/role.gurard';
import { RegisterUserDto } from './dto/register-user-dto';
import { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { EditUserDto } from './dto/edit-user.dto';
import { ChangePasswordDto } from './dto/chage-password.dto';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @ApiBearerAuth('bearer') // Связка со Swagger
    @Roles(['admin', 'trainer'])
    @UseGuards(RoleGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Get one user by ID' })
    @ApiParam({ name: 'id' })
    async getUser(@Param() { id }) {
        return await this.userService.getUser(id);
    }

/*     @ApiBearerAuth('bearer') // Связка со Swagger
    @Roles(['admin']) */
    @UseGuards(RoleGuard)
    @Post('/')
    @ApiOperation({ summary: 'Create a new system admin' })
    @ApiBody({ type: RegisterUserDto })
    async createUser(@Body() dto: RegisterUserDto) {
        return await this.userService.createUser({...dto,
            role : 'system-admin'
       });
    }

    @ApiBearerAuth('bearer') // Связка со Swagger
    @Roles(['building-admin'])
    @UseGuards(RoleGuard)
    @Post('/building-user')
    @ApiOperation({ summary: 'Create a new building user' })
    @ApiBody({ type: RegisterUserDto })
    async createBuildingUser(@Body() dto: RegisterUserDto) {
        return await this.userService.createUser({...dto,
             role : 'building-user'
        });
    }

    @ApiBearerAuth('bearer')
    @Roles(['system-admin'])
    @UseGuards(RoleGuard)
    @Post('/building-admin')
    @ApiOperation({ summary: 'Create a new building admin' })
    @ApiBody({ type: RegisterUserDto })
    async createBuildingAdmin(@Body() dto: RegisterUserDto) {
        return await this.userService.createUser({...dto,
            role : 'building-admin'
       });
    }




    @UseGuards(RoleGuard)
    @Get('/')
    @ApiOperation({ summary: 'Get all users' })
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    @ApiBearerAuth('bearer') // Связка со Swagger
    @Roles(['system-admin', 'building-admin'])
    @UseGuards(RoleGuard)
    @Get('/')
    @ApiOperation({ summary: 'Search users by query and role' })
    @ApiQuery({ name: 'search', required: false })
    @ApiQuery({ name: 'role', required: false })
    async searchUsers(@Query('searchQuery') searchQuery: string, @Query('role') role: string) {
        return await this.userService.searchPlayers(searchQuery, role);
    }

    @ApiBearerAuth('bearer')
    @Roles(['system-admin', 'building-admin'])
    @UseGuards(RoleGuard)
    @Put(':id')
    @ApiOperation({ summary: 'Update user by ID' })
    @ApiBody({ type: EditUserDto })
    async editUser(@Body() dto: EditUserDto, @Param() { id }) {
        return await this.userService.editUser(dto, id)
    }

    @ApiBearerAuth('bearer') // Связка со Swagger
    @Roles(['system-admin', 'building-admin'])
    @UseGuards(RoleGuard)
    @Delete('/:id')
    @ApiOperation({ summary: 'Delete user' })
    @ApiParam({ name: 'id' })
    async deletePlayer(@Param() { id }) {
        return await this.userService.deleteUser(id)
    }

    @Post('login')
    @ApiOperation({ summary: 'User logining' })
    @ApiBody({ type: LoginDto })
    async login(@Body() dto: LoginDto, @Res() res: Response) {
        const userData = await this.userService.login(dto);
        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 68 * 1000, httpOnly: true });
        res.cookie('deviceId', userData.deviceId, { maxAge: 30 * 24 * 60 * 68 * 1000, httpOnly: true });
        return res.status(200).json(userData);
    }

}
