import {PageService} from "../service/PageService";
import express, {NextFunction} from "express";
import {CookieStatuses} from "../service/CookieStatuses";
import path from "path";


export class PageController {

    async accessPersonalPage(req: express.Request, res: express.Response) {

        // need to send personal page here
        res.send("Personal page!!!");
    }

    async checkPersonalCookies(req: express.Request, res: express.Response, next: NextFunction) {

        let checkCookieStatus = await this.pageService.checkCookies(req);

        let {status, message} = checkCookieStatus;
        console.log({"status": CookieStatuses[status], "message": message});

        if (checkCookieStatus.status == CookieStatuses.NoCookie) {

            // user has no cookie at all and trying to access personal page
            // of existing user, redirecting to /login page
            res.redirect(307, "/login");
        }

        if (checkCookieStatus.status == CookieStatuses.BadCookie) {

            // bad cookie, maybe redirect to some other page later
            return res.status(403).json(checkCookieStatus);
        }

        if (checkCookieStatus.status == CookieStatuses.AnotherUserCookie) {

            //console.log(path.join(__dirname,"../../resources/Boar.png"));
            // return another user's page with articles
            return res.sendFile(path.join(__dirname,"../../resources/Boar.png"));
        }

        if (checkCookieStatus.status == CookieStatuses.AccessCookie) {

            // cookie is correct and matching this user id
            next();
        }

    }

    private pageService:PageService = new PageService();
}