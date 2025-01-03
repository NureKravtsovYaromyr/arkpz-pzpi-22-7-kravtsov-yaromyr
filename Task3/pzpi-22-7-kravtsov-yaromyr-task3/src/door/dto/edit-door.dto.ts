import { ApiProperty } from "@nestjs/swagger";

export class EditDoorDto{
    @ApiProperty({})
    readonly doorId: number;

    @ApiProperty({})
    readonly buildingId: number;

    @ApiProperty({})
    readonly users: number[];

}