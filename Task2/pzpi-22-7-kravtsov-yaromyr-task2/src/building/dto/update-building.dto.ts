import { ApiProperty } from '@nestjs/swagger';

export class UpdateBuildingDto {
    @ApiProperty({ example: 'Updated Name', description: 'Updated name of the building', required: false })
    name?: string;

    @ApiProperty({ example: 'Updated Address', description: 'Updated address of the building', required: false })
    address?: string;
}
