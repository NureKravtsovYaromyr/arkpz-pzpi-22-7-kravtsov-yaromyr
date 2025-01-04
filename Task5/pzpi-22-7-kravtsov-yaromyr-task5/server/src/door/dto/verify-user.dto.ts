import { ApiProperty } from '@nestjs/swagger';

export class VerifyUserDto {
    @ApiProperty({ example: '12345', description: 'User ID to verify' })
    userId: string;

    @ApiProperty({ example: 'ACCESS_KEY_123', description: 'Access key or token for verification' })
    doorId: string;
}
