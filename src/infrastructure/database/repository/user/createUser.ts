import { IUser } from "../../../../domain/user";
import UserModel from "../../model/userModel";

export const createUser = async (
    newUser:IUser,
    userModel:typeof UserModel
) =>{
    try {
        const user = await userModel.create(newUser)
        if(user){
            await user.save()
            return true
        }
        return false
    } catch (error) {
        throw error
    }
 
}