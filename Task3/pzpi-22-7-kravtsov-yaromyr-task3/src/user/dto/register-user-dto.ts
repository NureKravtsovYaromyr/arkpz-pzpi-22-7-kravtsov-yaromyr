import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString,MaxLength, MinLength } from "class-validator";
import { UserRole } from "../user.model";


export class RegisterUserDto {
    @IsString({ message: 'Der Name muss eine Zeichenfolge sein' })
    @ApiProperty({})
    readonly username:string;

    @ApiProperty({ required: false }) 
    readonly phone?:string;

    @ApiProperty({ required: false }) 
    readonly email?:string;

    @IsOptional()
    readonly role?: UserRole;

    @ApiProperty({ required: false }) 
    @IsOptional()
    readonly password?: string;
}

