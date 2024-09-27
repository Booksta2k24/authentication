import { Next, Res, Req } from "../infrastructure/types/expressTypes";
import { UserUseCase } from "../usecase/usecase/userUseCase";

export class UserController{
    private readonly userUseCase: UserUseCase;
    constructor(userUseCase: UserUseCase){
        this.userUseCase = userUseCase;
    }
    async createUser(req: Req, res: Res, next: Next) {
      
        try {
            const newUser = await this.userUseCase.createUser(req.body);
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
            const user = await this.userUseCase.loginUser(req.body);
            
            if (user) {
              res.cookie("userAccessToken", user.token.userAccessToken, {
                httpOnly:true,
                secure:true,
                sameSite: "strict",
                maxAge:  900000
            });
                res.cookie("userRefreshToken", user.token.userRefreshToken, {
                    httpOnly: true,
                    secure:true,
                    sameSite: "strict",
                    maxAge: 30 * 24 * 60 * 60 * 1000 
                });
            }
      
            res.status(user.status).json({
                success: user.success,
                data: user.data,
                message: user.message,
                userAccessToken:user.token.userAccessToken,
            });

        } catch (error) {
            next(error)
        }
      }
}