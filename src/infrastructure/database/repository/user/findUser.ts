import { IUser } from "../../../../domain/user";
import UserModel from "../../model/userModel";

export const findUser =async (
    email:string,
    userModel:typeof UserModel
) =>{
    try {
        const userExist = await userModel.findOne({email:email});
        if(userExist){
            return userExist
        }else{
            return null
        }
    } catch (error) {
        throw error
    }
}