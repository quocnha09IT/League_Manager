import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength, isStrongPassword } from "class-validator";

export class AuthDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email?: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(40)
    password?: string;
}