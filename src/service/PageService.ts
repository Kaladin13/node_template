import {AuthenticationToken} from "../webtoken/AuthenticationToken";
import express from "express";
import {UserRepository} from "../repository/UserRepository";
import {getCustomRepository} from "typeorm";
import {CookieStatuses} from "./CookieStatuses";


export class PageService {

    async fetchCookieStatus(req: express.Request) {

        const cookieToken = await req.cookies.token;

        if (cookieToken == null) {
            return {"status": CookieStatuses.NoCookie, "message": "No login cookies"};
        }

        const decodedToken = await this.authenticationToken.authenticateToken(cookieToken);
        const decodedUser = (decodedToken == null) ? null : decodedToken["user"];

        if ((decodedUser == null) ||
            ((await this.userRepository.findUserByLogin(decodedUser.login)) == null)) {

            return {"status": CookieStatuses.BadCookie, "message": "Cookie is expired or invalid"}
        }

        if (req.params.id != decodedUser.id.toString()) {
            return {
                "status": CookieStatuses.AnotherUserCookie,
                "message": "User trying to access page of another user"
            };
        }

        return {"status": CookieStatuses.AccessCookie, "message": decodedUser};

    }

    private userRepository: UserRepository = getCustomRepository(UserRepository);
    private authenticationToken: AuthenticationToken = new AuthenticationToken();
}