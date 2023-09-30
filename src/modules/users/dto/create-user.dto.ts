import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {

    @ApiProperty()
    name?: string

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email?: string

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(40)
    @ApiProperty()
    password?: string

    @ApiProperty()
    address?: string 

    @ApiProperty()
    sex?: boolean
}
