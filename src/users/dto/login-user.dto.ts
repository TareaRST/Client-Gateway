import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Role, RoleList } from "../enum/role.enum";

export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsOptional()
    @IsEnum(RoleList, {
        message: `Valid Roles are ${RoleList}`
    })
    role: Role
}