import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Door } from './door.model';
import { DoorUser } from './door-users.model';
import { CreateDoorDto } from './dto/create-door.dto';
import { EditDoorDto } from './dto/edit-door.dto';
import { UserService } from 'src/user/user.service';
import { VerifyUserDto } from './dto/verify-user.dto';

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
            if(user.role !== 'building-user'){
                throw new HttpException('', HttpStatus.UNAUTHORIZED)
            }

            await this.doorUserRepository.create({
                doorId: door.id,
                userId
            })
        })

    }


    async editDoor(dto: EditDoorDto) {
        //TODO Сделать логика с полученим массив индификаторов пользователей и сравнивать с уже существцющими и востанавливать 
    }

    async getDoor(doorId: number) {
        console.log('getDoor')
    }

    async getUserDoors(userId: number) {
        console.log('getUserDoors')
    }

    async deleteDoor(id: number) {
        console.log(id)
    }

    async verifyUserForDoor(dto: VerifyUserDto){
        const {userId, doorId} = dto;
        const userDoor = await this.doorUserRepository.findOne({
            where: {
                userId,
                doorId
            }
        })
        if(!userDoor) {
            throw new HttpException('У вас немає доуступу до цієї двері ', HttpStatus.NOT_FOUND)
        }

    }
}
/* 
00:00 - Вступ 
00:16 - Створення адміністратора системи
00:39 - Створення адміністратора будівлі
01:03 - Створення користувача будівлі
01:03 - Створення користувача будівлі
01:43 - Створення будівлі
02:50 - Створення двері та надання прав для входу в них
03:44 - Перевірка прав користувача забудови на доступ до двері
04:10 - Обробка випадку, коли у користувача немає доступу до двері 


*/