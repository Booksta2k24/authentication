import Encrypt from "../../infrastructure/services/bcrypt";
import JwtPassword from "../../infrastructure/services/jwt";
import { IUserRepository } from "../interface/repository/IuserRepository";
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
        firstName,
        lastName,
        email,
        password,
    }:{
        firstName:string,
        lastName:string,
        email:string,
        password:string,
    }){
        return createUser(
            this.userRepository,
            this.bcrypt,
            firstName,
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