import {UserRepository} from "../repository/UserRepository";
import {getCustomRepository} from "typeorm";
import {UserValidator} from "../validation/impl/userValidator";
import {User} from "../entity/User";


export class UserService {

    async regNewUser(requestBody): Promise<object> {

        if (!this.userValidator.validate(requestBody)) {
            return {"status": "fail", "message": "Invalid request"};
        }

        if (await this.userRepository.findUserByLogin(requestBody.login) != null) {
            return {"status": "fail", "message": "User with such login already exists"}
        }

        let user: User = this.userRepository.create();
        user.login = requestBody.login;
        user.password = requestBody.password;
        await this.userRepository.addUser(user);
        return {"status": "ok", "message": user};

    }

    private userRepository: UserRepository = getCustomRepository(UserRepository);
    private userValidator: UserValidator = new UserValidator();
}