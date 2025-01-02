import { ApiProperty } from "@nestjs/swagger";

export class CreateDoorDto{
    @ApiProperty({})
    readonly buildingId: number;

    @ApiProperty({})
    readonly users: number[];

}