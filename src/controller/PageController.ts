import {PageService} from "../service/PageService";
import express, {NextFunction} from "express";
import {CookieStatuses} from "../service/StatusEnums/CookieStatuses";
import path from "path";
import {RESOURCE_PATH} from "../property/ConstantValues";
import {StatusCodes} from "http-status-codes";
import {ResponseMapper} from "../mapper/ResponseMapper";
import {logParsedCookie} from "../logging/ParsedCookieLogging";


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


    async middlewareParseCookies(req: express.Request, res: express.Response, next: NextFunction, id: number) {

        // this function is parsing user's cookies, checking if jwt is present and valid
        const receivedCookieStatus: ResponseMapper = await this.pageService.parseCookie(req, id);

        logParsedCookie(receivedCookieStatus);

        if (receivedCookieStatus.status == CookieStatuses.BadCookie) {

            // bad cookie, maybe redirect to some other page later
            return res.status(StatusCodes.FORBIDDEN).json(receivedCookieStatus);
        }

        res.locals.parsedCookie = receivedCookieStatus;

        // we are delegating fetch logic to next function, here in middleware
        // we only parse cookie token and check invalid cookie
        next();
    }

    private pageService: PageService = new PageService();
}