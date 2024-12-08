export interface Responsedata{
    _id?:string;
    firstName?:string;
    lastName?:string;
    email?:string;
    isBlock?:boolean;
    profileImage?:string;
    password?:string;
    userAccessToken?:string;
    userRefreshToken?:string;
}

export interface IResponse<T=Responsedata>{
    status : number,
    success : boolean,
    message ?: string,
    data?:T,
}