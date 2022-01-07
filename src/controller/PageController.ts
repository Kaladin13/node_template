import {PageService} from "../service/PageService";
import express, {NextFunction} from "express";
import {CookieStatuses} from "../service/CookieStatuses";
import path from "path";
import {RESOURCE_PATH} from "../property/ConstantValues";
import {StatusCodes} from "http-status-codes";


export class PageController {

    async accessPersonalPage(req: express.Request, res: express.Response) {

        // need to send personal page here
        res.status(StatusCodes.OK).send("Personal page!!!");
    }

    async checkPersonalCookies(req: express.Request, res: express.Response, next: NextFunction) {

        const checkCookieStatus = await this.pageService.checkCookies(req);

        const {status, message} = checkCookieStatus;
        console.log({"status": CookieStatuses[status], "message": message});

        if (checkCookieStatus.status == CookieStatuses.NoCookie) {

            // user has no cookie at all and trying to access personal page
            // of existing user, redirecting to /login page
            res.redirect(StatusCodes.TEMPORARY_REDIRECT, "/login");
        }

        if (checkCookieStatus.status == CookieStatuses.BadCookie) {

            // bad cookie, maybe redirect to some other page later
            return res.status(StatusCodes.FORBIDDEN).json(checkCookieStatus);
        }

        if (checkCookieStatus.status == CookieStatuses.AnotherUserCookie) {

            //console.log(path.join(__dirname,"../../resources/Boar.png"));
            // return another user's page with articles
            return res.sendFile(path.join(__dirname, RESOURCE_PATH));
        }

        if (checkCookieStatus.status == CookieStatuses.AccessCookie) {

            // cookie is correct and matching this user id
            next();
        }

    }

    private pageService: PageService = new PageService();
}