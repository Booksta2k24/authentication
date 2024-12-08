import Encrypt from "../../../infrastructure/services/bcrypt";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import ErrorResponse from "../../handler/errorResponse";
import { StatusCodes } from "../../../infrastructure/types/enums";
import { IConnectionInterface } from "../../interface/connections/IconnectionInterface";

export const createUser = async (
    userRepository: IUserRepository,
    connectionInterface: IConnectionInterface,
    bcrypt: Encrypt,
    username: string,
    email: string,
    password: string,
) => {
    try {
        const user = await userRepository.findUser(email)
        if (!user) {
            const hashedPassword = await bcrypt.createHash(password)
            const newUser = {
                username,
                email,
                password: hashedPassword,
                profileImage: ''
            }
            const creatingUser = await userRepository.createUser(newUser)
            if (creatingUser) {
                //establish rabbit mq connection with community service
                const connection = await connectionInterface.publishUserConnection(newUser);
                if (connection) {
                    return {
                        status: StatusCodes.OK,
                        success: true,
                        message: `Account was created successfully${username}`,
                    }
                } else {
                    throw ErrorResponse.internalError('Community service connection error...')
                }
            }
        }
        throw ErrorResponse.badRequest('user is already exist')
    } catch (error) {
        throw error
    }
}