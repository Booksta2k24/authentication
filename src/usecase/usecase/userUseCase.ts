import Encrypt from "../../infrastructure/services/bcrypt";
import JwtPassword from "../../infrastructure/services/jwt";
import { IConnectionInterface } from "../interface/connections/IconnectionInterface";
import { IUserRepository } from "../interface/repository/IUserRepository";
import { createUser } from "./user/createUser";
import { loginUser } from "./user/loginUser";

export class UserUseCase{
    private readonly userRepository:IUserRepository;
    private readonly connectionInterface: IConnectionInterface;
    private readonly bcrypt:Encrypt;
    private readonly jwt :JwtPassword;

    constructor(
        userRepository:IUserRepository,
        connectionInterface: IConnectionInterface,
        bcrypt:Encrypt,
        jwt:JwtPassword
    ){
        this.userRepository = userRepository,
        this.connectionInterface = connectionInterface,
        this.bcrypt = bcrypt,
        this.jwt = jwt
    }
    async createUser({
        username,
        email,
        password,
    }:{
        username:string,
        email:string,
        password:string,
    }){
        return createUser(
            this.userRepository,
            this.connectionInterface,
            this.bcrypt,
            username,
            email,
            password,
        )
    }
    async loginUser({
        email,
        password,
        
    }:{
        email:string;
        password:string
    }){
        return loginUser(
            this.userRepository,
            this.bcrypt,
            this.jwt,
            email,
            password
        )
    }
}