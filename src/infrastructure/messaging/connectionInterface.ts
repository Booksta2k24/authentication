import { IUser } from "../../domain/user";
import { IConnectionInterface } from "../../usecase/interface/connections/IconnectionInterface";
import { publishUserConnection } from "./connections/publishUserConnection";


export class ConnectionInterface implements IConnectionInterface {
    async publishUserConnection(userData: IUser): Promise<boolean> {
        return publishUserConnection(userData)
    }
}