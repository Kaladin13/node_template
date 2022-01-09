import express from "express";
import {MiddlewareStatuses} from "../service/StatusEnums/MiddlewareStatuses";
import path from "path";
import {RESOURCE_PATH} from "../../property/ConstantValues";
import {StatusCodes} from "http-status-codes";
import {ResponseMapper} from "../mapper/ResponseMapper";
import {ArticleService} from "../service/ArticleService";
import {ArticleInfo} from "../../database_handling/model/dto/ArticleInfo";
import {Logger} from "../../logging/Logger";


export class PageController {


    async accessUserPage(req: express.Request, res: express.Response) {

        const receivedCookieStatus: ResponseMapper = res.locals.parsedCookie;


        //get this user articles' info
        const userArticlesInfo: ArticleInfo[] =
            await this.articleService.getUserArticles(req);

        Logger.info("Received such articles", userArticlesInfo);

        if (receivedCookieStatus.status == MiddlewareStatuses.AnotherUserCookie ||
            receivedCookieStatus.status == MiddlewareStatuses.NoCookie) {

            // return another user's page with articles without editing features,
            // same logic for no-login user and another user
            // *maybe changed later*
            //return res.status(StatusCodes.OK).sendFile(path.join(__dirname, RESOURCE_PATH));
            return res.status(StatusCodes.OK).json(userArticlesInfo);
        }

        if (receivedCookieStatus.status == MiddlewareStatuses.AccessCookie) {

            // cookie is correct and matching this user id
            //return res.status(StatusCodes.OK).send("Personal page!!!");
            return res.status(StatusCodes.OK).json(userArticlesInfo);
        }

    }

    private articleService: ArticleService = new ArticleService();
}