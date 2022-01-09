import express, {NextFunction} from "express";
import {ResponseMapper} from "../mapper/ResponseMapper";
import {logParsedCookie} from "../../logging/ParsedCookieLogging";
import {MiddlewareStatuses} from "../service/StatusEnums/MiddlewareStatuses";
import {StatusCodes} from "http-status-codes";
import {MiddlewareService} from "../service/MiddlewareService";


export class MiddlewareController {

    async middlewareParseCookies(req: express.Request, res: express.Response, next: NextFunction, id: number) {

        // this function is parsing user's cookies, checking if jwt is present and valid
        const receivedCookieStatus: ResponseMapper = await this.pageService.parseCookie(req, id);

        logParsedCookie(receivedCookieStatus);

        if (receivedCookieStatus.status == MiddlewareStatuses.BadCookie) {

            // bad cookie, maybe redirect to some other page later
            return res.status(StatusCodes.FORBIDDEN).json(receivedCookieStatus);
        }

        if (receivedCookieStatus.status == MiddlewareStatuses.InvalidId) {

            return res.status(StatusCodes.NOT_FOUND).json(receivedCookieStatus);
        }

        res.locals.parsedCookie = receivedCookieStatus;

        // we are delegating fetch logic to next function, here in middleware
        // we only parse cookie token and check invalid cookie
        next();
    }

    private pageService: MiddlewareService = new MiddlewareService();

}