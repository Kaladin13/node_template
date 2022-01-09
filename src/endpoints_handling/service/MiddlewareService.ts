import {AuthenticationToken} from "../webtoken/AuthenticationToken";
import express from "express";
import {UserRepository} from "../../database_handling/repository/UserRepository";
import {getCustomRepository} from "typeorm";
import {MiddlewareStatuses} from "./StatusEnums/MiddlewareStatuses";
import {ResponseMapper} from "../mapper/ResponseMapper";
import {User} from "../../database_handling/entity/User";


export class MiddlewareService {

    async parseCookie(req: express.Request, id: number): Promise<ResponseMapper> {

        const cookieToken = await req.cookies.token;

        if (cookieToken == null) {

            return new ResponseMapper(MiddlewareStatuses.NoCookie,
                "No login cookies");
        }

        if (await this.userRepository.findUserById(id) == null) {

            return new ResponseMapper(MiddlewareStatuses.InvalidId,
                "There is no user with such id");
        }

        const decodedToken = await this.authenticationToken.authenticateToken(cookieToken);
        const decodedUser: User = (decodedToken == null) ? null : decodedToken["user"];

        if ((decodedUser == null) ||
            ((await this.userRepository.findUserByLogin(decodedUser.login)) == null)) {

            return new ResponseMapper(MiddlewareStatuses.BadCookie,
                "Cookie is expired or invalid");
        }

        if (id != decodedUser.id) {

            return new ResponseMapper(MiddlewareStatuses.AnotherUserCookie,
                "User trying to access page of another user",
                decodedUser);
        }

        return new ResponseMapper(MiddlewareStatuses.AccessCookie,
            "User is accessing his page",
            decodedUser);

    }


    private userRepository: UserRepository = getCustomRepository(UserRepository);
    private authenticationToken: AuthenticationToken = new AuthenticationToken();
}