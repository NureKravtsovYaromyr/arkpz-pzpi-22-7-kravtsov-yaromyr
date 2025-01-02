
import { Model, Column, DataType, Table, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";
import { User } from "src/user/user.model";


interface BuildingCreationAttrs {
    comment?: string;
    address?: string;
    adminId: number
}

@Table({ tableName: 'buildings', createdAt: false, updatedAt: false })
export class Building extends Model<Building, BuildingCreationAttrs> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: true })
    address: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    comment: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    adminId: number;
    @BelongsTo(() => User)
    admin: User;
    
}