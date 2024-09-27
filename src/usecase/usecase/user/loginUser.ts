import { IUserRepository } from "../../interface/repository/IUserRepository";
import Encrypt from '../../../infrastructure/services/bcrypt';
import Ijwt from "../../interface/services/Ijwt";
import ErrorResponse from "../../handler/errorResponse";
import { IUser } from "../../../domain/user";
import { StatusCodes } from "../../../infrastructure/types/enums";
import { Responsedata } from "../../interface/services/Iresponse";

export const loginUser =async (
    userRepository:IUserRepository,
    bcrypt:Encrypt,
    jwt:Ijwt,
    email:string,
    password:string,
) =>{
  try {
    const user: IUser | null = await userRepository.findUser(email)
    console.log('===user=== ',user);
    
    if (user && user._id) {
        if (user.isBlock) {
            throw ErrorResponse.badRequest('You are corrently blocked');
        }
        const match:boolean = await bcrypt.compare(password,user.password as string)
        if(match){
        const { accessToken, refreshToken } = await jwt.createJWT(user._id, user.email as string, "user", user.firstName as string);
       
        const responseData:Responsedata = {
            _id: user._id,
            firstName: user.firstName,
            lastName:user.lastName,
            email: user.email as string,
            profileImage:user.profileImage,
        }

        return {
            status: StatusCodes.OK,
            success: true,
            data: responseData,
            token:{ 
              userAccessToken: accessToken,
              userRefreshToken: refreshToken
            },
            message: `Login successful, welcome ${user.firstName}`
        }
    }
    throw ErrorResponse.badRequest('wrong password or email');
    }
    throw ErrorResponse.badRequest('wrong password or email');
  } catch (error) {
    throw error
  }
}