import { IUser } from "../../../domain/user";
import { IUserRepository } from "../../../usecase/interface/repository/IUserRepository";
import { createUser } from "./user/createUser";
import UserModel from "../model/userModel";
import { findUser } from "./user/findUser";

export class UserRepository implements IUserRepository{
    constructor(private readonly usersModel:typeof UserModel){}
    async createUser(newUser: IUser): Promise<boolean> {
        return createUser(newUser,this.usersModel)
    }
    findUser(email: string): Promise<IUser | null> {
        return findUser(email,this.usersModel)
    }
    
    
}