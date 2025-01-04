import { ApiProperty } from '@nestjs/swagger';

export class UpdateBuildingDto {
    @ApiProperty({ example: 'Building id', required: false })
    buildingId: number;

    @ApiProperty({})
    address: string;

    @ApiProperty({})
    comment: string;
}
