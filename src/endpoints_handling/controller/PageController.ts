import express from "express";
import {CookieStatuses} from "../service/StatusEnums/CookieStatuses";
import path from "path";
import {RESOURCE_PATH} from "../../property/ConstantValues";
import {StatusCodes} from "http-status-codes";
import {ResponseMapper} from "../mapper/ResponseMapper";


export class PageController {


    async accessUserPage(req: express.Request, res: express.Response) {

        const receivedCookieStatus: ResponseMapper = res.locals.parsedCookie;

        if (receivedCookieStatus.status == CookieStatuses.AnotherUserCookie ||
            receivedCookieStatus.status == CookieStatuses.NoCookie) {

            // return another user's page with articles,
            // same logic for no-login user and other user
            // *maybe changed later*
            return res.status(StatusCodes.OK).sendFile(path.join(__dirname, RESOURCE_PATH));
        }

        if (receivedCookieStatus.status == CookieStatuses.AccessCookie) {

            // cookie is correct and matching this user id
            return res.status(StatusCodes.OK).send("Personal page!!!");
        }

    }


}