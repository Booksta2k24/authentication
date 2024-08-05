import { JwtType } from "../../../infrastructure/types/jwtTypes"
interface Ijwt {
    createJWT(userid : string , email : string , role : string , first_name : string ):Promise<JwtType>;
}

export default Ijwt