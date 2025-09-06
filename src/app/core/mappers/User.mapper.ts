import { ILoginUser } from "../../pages/login/ILoginUser";
import { IRegisterUser } from "../../pages/register/IRegisterUser";
import { LoggedUserDto, LoginUserDto, RegisterUserDto } from "../dtos/UserDto";
import { User } from "../models/User";

export class UserMapper{
    public static toRegisterDto(user: IRegisterUser): RegisterUserDto{
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        }
    }

    public static fromLoggedUserToModel(user: LoggedUserDto): User{
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            createdAt: user.createdAt
        }
    }

    public static toLoginDto(user: ILoginUser): LoginUserDto {
        return {
            email: user.email,
            password: user.password
        }
    }
}