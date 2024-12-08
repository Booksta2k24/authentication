import { IUser } from "../../../domain/user";

export interface IUserRepository{
    createUser(newUser:IUser):Promise<boolean>;
    findUser(email:string):Promise<IUser|null>;
}