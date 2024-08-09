import Encrypt from "../../infrastructure/services/bcrypt";
import JwtPassword from "../../infrastructure/services/jwt";
import { IUserRepository } from "../interface/repository/IUserRepository";
import { createUser } from "./user/createUser";
import { loginUser } from "./user/loginUser";

export class UserUseCase{
    private readonly userRepository:IUserRepository;
    private readonly bcrypt:Encrypt;
    private readonly jwt :JwtPassword;

    constructor(
        userRepository:IUserRepository,
        bcrypt:Encrypt,
        jwt:JwtPassword
    ){
        this.userRepository=userRepository,
        this.bcrypt=bcrypt,
        this.jwt=jwt
    }
    async createUser({
        firsName,
        lastName,
        email,
        password,
    }:{
        firsName:string,
        lastName:string,
        email:string,
        password:string,
    }){
        return createUser(
            this.userRepository,
            this.bcrypt,
            firsName,
            lastName,
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