import {UserRepository} from "../repository/UserRepository";
import {getCustomRepository} from "typeorm";
import {UserValidator} from "../validation/impl/UserValidator";
import {User} from "../entity/User";
import {AuthenticationToken} from "../webtoken/AuthenticationToken";
import express from "express";
import {ResponseMapper} from "../mapper/ResponseMapper";
import {ResponseStatuses} from "./StatusEnums/ResponseStatuses";


export class UserService {

    async regNewUser(req: express.Request): Promise<ResponseMapper> {

        const reqBody = req.body;

        if (!reqBody || !this.userValidator.validate(reqBody)) {

            return new ResponseMapper(ResponseStatuses.BadRequest,
                "Invalid request");
        }

        if (await this.userRepository.findUserByLogin(reqBody.login) != null) {

            return new ResponseMapper(ResponseStatuses.Fail,
                "User with such login already exists");
        }

        let user: User = this.userRepository.create();
        user.login = reqBody.login;
        user.password = reqBody.password;
        await this.userRepository.addUser(user);

        return new ResponseMapper(ResponseStatuses.Ok,
            "User is successfully registered",
            user);

    }


    async authenticateUser(req: express.Request): Promise<ResponseMapper> {

        const reqBody = req.body;

        if (!reqBody || !this.userValidator.validate(reqBody)) {

            return new ResponseMapper(ResponseStatuses.BadRequest,
                "Invalid request");
        }

        const user: User = await this.userRepository.findUserByLogin(reqBody.login);

        if (user == null) {

            return new ResponseMapper(ResponseStatuses.Fail,
                "User with such login doesn't exist");
        }

        if (user.password != reqBody.password) {

            return new ResponseMapper(ResponseStatuses.Fail,
                "Wrong password");
        }

        const accessToken = await this.authenticationToken.generateAccessToken(user);


        return new ResponseMapper(ResponseStatuses.Ok,
            "User is successfully authorised",
            {user: user, token: accessToken});
    }


    private authenticationToken: AuthenticationToken = new AuthenticationToken();
    private userRepository: UserRepository = getCustomRepository(UserRepository);
    private userValidator: UserValidator = new UserValidator();
}