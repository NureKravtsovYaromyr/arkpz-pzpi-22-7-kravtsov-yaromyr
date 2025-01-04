import { ApiProperty } from '@nestjs/swagger';

export class GrantAccessDto {
    @ApiProperty({ description: 'User ID who will get access' })
    userIds: number[];

}
