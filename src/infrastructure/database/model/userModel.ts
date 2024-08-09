import mongoose,{Document,Model,Schema} from "mongoose";
import { IUser } from "../../../domain/user";

const userSchema: Schema = new Schema<IUser & Document>(
    {
        firstName:{
            type:String,
        },
        lastName:{
            type:String,
        },
        email:{
            type:String,
        },
        isBlock:{
            default:false,
            type:Boolean,
        },
        profileImage:{
            type:String,
        },
        password:{
            type:String
        }
    },{
        timestamps:true
    }
)

const UserModel : Model<IUser & Document> = mongoose.model<IUser & Document>('User',userSchema)
export default UserModel