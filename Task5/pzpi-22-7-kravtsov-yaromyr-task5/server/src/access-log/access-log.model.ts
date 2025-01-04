
import { Model, Column, DataType, Table, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Door } from "src/door/door.model";
import { User } from "src/user/user.model";

interface AccessLogCreationAttrs {
    zoneId: number;
    userId: number;
}

@Table({ tableName: 'access_logs', createdAt: false, updatedAt: false })
export class AccessLog extends Model<AccessLog, AccessLogCreationAttrs> {
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