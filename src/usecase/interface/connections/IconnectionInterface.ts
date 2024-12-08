import { IUser } from "../../../domain/user";

export interface IConnectionInterface{
    publishUserConnection(newUser:IUser):Promise<boolean>;
}