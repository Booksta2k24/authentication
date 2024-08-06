import { Next, Res, Req } from "../infrastructure/types/expressTypes";
import { UserUseCase } from "../usecase/usecase/userUseCase";

export class UserController{
    private readonly usreusecase: UserUseCase;
    constructor(userusecase: UserUseCase){
        this.usreusecase = userusecase;
    }
    async createUser(req: Req, res: Res, next: Next) {
      
        try {
            const newUser = await this.usreusecase.createUser(req.body);
            if (newUser ) {
                res.status(newUser.status).json({
                    success: newUser.success,
                    message: newUser.message,
                });
            }
        } catch (error) {
            next(error);
        }
    }
    async loginUser(req: Req, res: Res, next: Next) {
        try {
            const user = await this.usreusecase.loginUser(req.body);
            
            if (user) {
              res.cookie("userAccessToken", user.data.userAccessToken, {
                httpOnly:true,
                secure:true,
                sameSite: "strict",
                maxAge:  900000
            });
                res.cookie("userRefreshToken", user.data.userRefreshToken, {
                    httpOnly: true,
                    secure:true,
                    sameSite: "strict",
                    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days for refreshToken
                });
            }
      
            res.status(user.status).json({
                success: user.success,
                data: user.data,
                message: user.message,
                userAccessToken:user.data.userAccessToken,
                userRefreshToken:user.data.userRefreshToken
            });
        } catch (error) {
            // Handle errors
            next(error)
        }
      }
}