
import { Model, Column, DataType, Table, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Building } from "src/building/building.model";
import { Door } from "src/door/door.model";
import { User } from "src/user/user.model";



interface DoorUserCreationAttrs {
    doorId: number;
    userId: number;
}
// Доступ к зонам 
@Table({ tableName: 'door_users', createdAt: false, updatedAt: false })
export class DoorUser extends Model<DoorUser, DoorUserCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
    
    @ForeignKey(() => Door)
    @Column({ type: DataType.INTEGER })
    doorId: number;
    @BelongsTo(() => Door)
    door: Door;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;
    @BelongsTo(() => User)
    user: User;
}