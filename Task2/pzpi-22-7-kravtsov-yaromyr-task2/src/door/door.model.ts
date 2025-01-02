
import { Model, Column, DataType, Table, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Building } from "src/building/building.model";



interface DoorCreationAttrs {
    buildingId: number;
}

@Table({ tableName: 'doors', createdAt: false, updatedAt: false })
export class Door extends Model<Door, DoorCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
    
    @ForeignKey(() => Building)
    @Column({ type: DataType.INTEGER })
    buildingId: number;
    @BelongsTo(() => Building)
    building: Building;

}