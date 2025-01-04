
import { Model, Column, DataType, Table, HasMany } from "sequelize-typescript";
import { Building } from "src/building/building.model";
import { DoorUser } from "src/door/door-users.model";

import { Token } from "src/token/token.model";


 
export type UserRole = 'building-user' | 'system-admin' | 'building-admin';
interface UserCreationAttrs {
    username: string;
    password?: string;
    role: string;
    phone?: string;
    email?: string;
}

@Table({ tableName: 'user', createdAt: false, updatedAt: false })
export class User extends Model<User, UserCreationAttrs> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    username: string;

    @Column({ type: DataType.STRING, allowNull: true })
    phone: string;

    @Column({ type: DataType.STRING, allowNull: true })
    email: string;

    @Column({ type: DataType.STRING, allowNull: true })
    password: string;

    @Column({ type: DataType.STRING, allowNull: false })
    role: UserRole;


    @Column({ type: DataType.TEXT, allowNull: true })
    adminComment: string;

    @HasMany(() => Token)
    tokens: Token[];

    @HasMany(() => Building)
    buildings: Building[];

    @HasMany(() => DoorUser)
    doorUsers: DoorUser[];

}