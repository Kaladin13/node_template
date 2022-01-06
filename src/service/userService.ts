import {UserRepository} from "../repository/UserRepository";
import {getCustomRepository} from "typeorm";
import {UserValidator} from "../validation/impl/userValidator";
import {User} from "../entity/User";
import {AuthenticationToken} from "../webtoken/AuthenticationToken";


export class UserService {

    async regNewUser(requestBody): Promise<object> {

        if (!this.userValidator.validate(requestBody)) {
            return {"status": "bad request", "message": "Invalid request"};
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

    async authenticateUser(requestBody): Promise<object> {

        if (!this.userValidator.validate(requestBody)) {
            return {"status": "bad request", "message": "Invalid request"};
        }

        let user: User = await this.userRepository.findUserByLogin(requestBody.login);

        if (user == null) {
            return {"status": "fail", "message": "User with such login doesn't exist"};
        }

        if (user.password != requestBody.password) {
            return {"status": "fail", "message": "Wrong password"};
        }

        let accessToken = await this.authenticationToken.generateAccessToken(user);

        return {"status": "ok", "message": user, "token": accessToken};
    }

    private authenticationToken: AuthenticationToken = new AuthenticationToken();
    private userRepository: UserRepository = getCustomRepository(UserRepository);
    private userValidator: UserValidator = new UserValidator();
}