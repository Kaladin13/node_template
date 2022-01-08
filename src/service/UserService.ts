import {UserRepository} from "../repository/UserRepository";
import {getCustomRepository} from "typeorm";
import {UserValidator} from "../validation/impl/UserValidator";
import {User} from "../entity/User";
import {AuthenticationToken} from "../webtoken/AuthenticationToken";
import express from "express";


export class UserService {

    async regNewUser(req: express.Request): Promise<object> {

        const reqBody = req.body;

        if (!this.userValidator.validate(reqBody)) {
            return {"status": "bad request", "message": "Invalid request"};
        }

        if (await this.userRepository.findUserByLogin(reqBody.login) != null) {
            return {"status": "fail", "message": "User with such login already exists"}
        }

        let user: User = this.userRepository.create();
        user.login = reqBody.login;
        user.password = reqBody.password;
        await this.userRepository.addUser(user);

        return {"status": "ok", "message": user};

    }

    async authenticateUser(req: express.Request): Promise<object> {

        const reqBody = req.body;

        if (!this.userValidator.validate(reqBody)) {
            return {"status": "bad request", "message": "Invalid request"};
        }

        const user: User = await this.userRepository.findUserByLogin(reqBody.login);

        if (user == null) {
            return {"status": "fail", "message": "User with such login doesn't exist"};
        }

        if (user.password != reqBody.password) {
            return {"status": "fail", "message": "Wrong password"};
        }

        const accessToken = await this.authenticationToken.generateAccessToken(user);

        return {"status": "ok", "message": user, "token": accessToken};
    }

    private authenticationToken: AuthenticationToken = new AuthenticationToken();
    private userRepository: UserRepository = getCustomRepository(UserRepository);
    private userValidator: UserValidator = new UserValidator();
}