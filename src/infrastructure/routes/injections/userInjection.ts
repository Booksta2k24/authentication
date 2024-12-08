import { UserController } from "../../../controller/userController";
import { UserUseCase } from "../../../usecase/usecase/userUseCase";
import UserModel from "../../database/model/userModel";
import { UserRepository } from "../../database/repository/userRepository";
import { ConnectionInterface } from "../../messaging/connectionInterface";
import Encrypt from "../../services/bcrypt";
import JwtPassword from "../../services/jwt";

const userRepository = new UserRepository(UserModel)
const connectionInterface = new ConnectionInterface();
const bcrypt = new Encrypt()
const jwt = new JwtPassword()

const userUsecase = new UserUseCase(
    userRepository,
    connectionInterface,
    bcrypt,
    jwt,
)
const userController = new UserController(userUsecase)
export { userController }