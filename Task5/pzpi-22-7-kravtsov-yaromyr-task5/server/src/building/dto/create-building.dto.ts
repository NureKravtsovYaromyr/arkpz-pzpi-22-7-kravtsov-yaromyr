import { ApiProperty } from "@nestjs/swagger";

export class CreateBuildingDto {

    @ApiProperty({required: false})
    readonly address: string;

    @ApiProperty({required: false})
    readonly comment?: string;

    @ApiProperty({required: false})
    readonly adminId: number;

}