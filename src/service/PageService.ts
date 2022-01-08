import {AuthenticationToken} from "../webtoken/AuthenticationToken";
import express from "express";
import {UserRepository} from "../repository/UserRepository";
import {getCustomRepository} from "typeorm";
import {CookieStatuses} from "./StatusEnums/CookieStatuses";
import {ResponseMapper} from "../mapper/ResponseMapper";


export class PageService {

    async fetchCookieStatus(req: express.Request): Promise<ResponseMapper> {

        const cookieToken = await req.cookies.token;

        if (cookieToken == null) {

            return new ResponseMapper(CookieStatuses.NoCookie,
                "No login cookies");
        }

        const decodedToken = await this.authenticationToken.authenticateToken(cookieToken);
        const decodedUser = (decodedToken == null) ? null : decodedToken["user"];

        if ((decodedUser == null) ||
            ((await this.userRepository.findUserByLogin(decodedUser.login)) == null)) {

            return new ResponseMapper(CookieStatuses.BadCookie,
                "Cookie is expired or invalid");
        }

        if (req.params.id != decodedUser.id.toString()) {

            return new ResponseMapper(CookieStatuses.AnotherUserCookie,
                "User trying to access page of another user");
        }


        return new ResponseMapper(CookieStatuses.AccessCookie,
            "User is accessing his page",
            decodedUser);
    }

    private userRepository: UserRepository = getCustomRepository(UserRepository);
    private authenticationToken: AuthenticationToken = new AuthenticationToken();
}