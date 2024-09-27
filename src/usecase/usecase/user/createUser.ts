import Encrypt from "../../../infrastructure/services/bcrypt";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import ErrorResponse from "../../handler/errorResponse";
import { StatusCodes } from "../../../infrastructure/types/enums";

export const createUser = async (
    userRepository:IUserRepository,
    bcrypt:Encrypt,
    firstName:string,
    lastName:string,
    email:string,
    password:string,
) =>{
    try {
        const user = await userRepository.findUser(email)
    if(!user){
       const hashedPassword = await bcrypt.createHash(password)
       const newUser = {
        firstName,
        lastName,
        email,
        password:hashedPassword,
        profileImage:''
       }
       const creatingUser = await userRepository.createUser(newUser)
       if(creatingUser){
        return {
            status:StatusCodes.OK,
            success:true,
            message:`Account was created successfully ${firstName+' '+lastName}`,
        }
       }
    }
     throw ErrorResponse.badRequest('user is already exist')
    } catch (error) {
        throw error
    }
}