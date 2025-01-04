import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Door } from './door.model';
import { DoorUser } from './door-users.model';
import { CreateDoorDto } from './dto/create-door.dto';
import { EditDoorDto } from './dto/edit-door.dto';
import { UserService } from 'src/user/user.service';
import { VerifyUserDto } from './dto/verify-user.dto';
import { GrantAccessDto } from './dto/grant-access.dto';

@Injectable()
export class DoorService {

    constructor(@InjectModel(Door) private doorRepository: typeof Door,
        @InjectModel(DoorUser) private doorUserRepository: typeof DoorUser,
        private userService: UserService
    ) { }


    async createDoor(dto: CreateDoorDto) {
        const { buildingId, users } = dto
        const door = await this.doorRepository.create({ buildingId });

        users.map(async (userId) => {
            const user = await this.userService.findByPk(userId);
            if (user.role !== 'building-user') {
                throw new HttpException('', HttpStatus.UNAUTHORIZED)
            }

            await this.doorUserRepository.create({
                doorId: door.id,
                userId
            })
        })


        return {door}

    }

    async grantAccessToDoor(doorId: number, dto: GrantAccessDto) {
        const { userIds } = dto;



        const doorAccesses = await this.doorUserRepository.findAll({ where: { doorId } });

        const doorAccessIds = doorAccesses.map((access) => access.userId);

        for (const accessId of doorAccessIds) {
            if (!userIds.includes(accessId)) {
                await this.doorUserRepository.destroy({ where: { doorId, userId: accessId } });
            }
        }

        for (const userId of userIds) {
            if (!doorAccessIds.includes(userId)) {
                await this.doorUserRepository.create({ doorId, userId });
            }
        }

    }

    async editDoor(dto: EditDoorDto) {
        const { doorId, buildingId, users } = dto
        const door = await this.doorRepository.findByPk(doorId);
        if (!door) {
            throw new HttpException('Не було знайдено двері', HttpStatus.UNAUTHORIZED)
        }

        const doorAccesses = await this.doorUserRepository.findAll({ where: { doorId } });

        const doorAccessIds = doorAccesses.map((access) => access.userId);

        for (const accessId of doorAccessIds) {
            if (!users.includes(accessId)) {
                await this.doorUserRepository.destroy({ where: { doorId, userId: accessId } });
            }
        }

        for (const userId of users) {
            if (!doorAccessIds.includes(userId)) {
                await this.doorUserRepository.create({ doorId, userId });
            }
        }

        return;
    }

    async getDoor(doorId: number) {
        const door = await this.doorRepository.findByPk(doorId);
        if(!door){
            throw new HttpException('Не було знайдено двері', HttpStatus.UNAUTHORIZED)
        }
        const doorAccesses = await this.doorUserRepository.findAll({ where: { doorId } });

        return {door,doorAccesses};
    }

    async getUserDoors(userId: number) {
        const doorAccesses = await this.doorUserRepository.findAll({where:{
            userId
        }});
        
     
        return doorAccesses;
    }

    async deleteDoor(id: number) {
        await this.doorUserRepository.destroy({where: {
            doorId: id
        }})
        await this.doorRepository.destroy({where: {id}});
        return;
    }

    async verifyUserForDoor(dto: VerifyUserDto) {
        const { userId, doorId } = dto;
        console.log(userId, doorId)
        const userDoor = await this.doorUserRepository.findOne({
            where: {
                userId,
                doorId
            }
        })
        if (!userDoor) {
            throw new HttpException('У вас немає доуступу до цієї двері ', HttpStatus.NOT_FOUND)
        }
    }

    async deleteDoorsByBuilding(buildingId: number) {
        // Получаем все двери одним запросом
        const doors = await this.doorRepository.findAll({ where: { buildingId } });
        const doorIds = doors.map((door) => door.id);
    
        if (doorIds.length === 0) return;
    
        // Массовое удаление всех связанных записей в doorUserRepository
        await this.doorUserRepository.destroy({
            where: {
                doorId: doorIds
            }
        });
    
        // Массовое удаление дверей
        await this.doorRepository.destroy({
            where: {
                id: doorIds
            }
        });
    }


    async getAccessAnomalies() {
        const accessData = await this.getDoorAccessData();

        const userAccessCounts: Record<string, number> = {};

        accessData.forEach((access) => {
            if (!userAccessCounts[access.userId]) {
                userAccessCounts[access.userId] = 0;
            }
            userAccessCounts[access.userId]++;
        });

        const anomalies = Object.entries(userAccessCounts).filter(([userId, count]) => count > 10);

        return {
            anomalies,
        };
    }

    async getDoorAccessData() {
        try {
            return await this.doorUserRepository.findAll();
        } catch (error) {
            throw new HttpException(
                'Failed to retrieve access data',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    async getAlldoors(){
        return await this.doorRepository.findAll()

    }
}
