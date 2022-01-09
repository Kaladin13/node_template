import {ArticleService} from "../service/ArticleService";
import express from "express";
import {ResponseMapper} from "../mapper/ResponseMapper";
import {MiddlewareStatuses} from "../service/StatusEnums/MiddlewareStatuses";
import {StatusCodes} from "http-status-codes";
import {logResponse} from "../../logging/ResponseLogging";


export class ArticleController {

    async postUserArticle(req: express.Request, res: express.Response) {

        const receivedCookieStatus: ResponseMapper = res.locals.parsedCookie;

        if (receivedCookieStatus.status == MiddlewareStatuses.AnotherUserCookie ||
            receivedCookieStatus.status == MiddlewareStatuses.NoCookie) {


            return res.status(StatusCodes.FORBIDDEN).json(receivedCookieStatus);
        }

        const postArticleStatus: ResponseMapper =
            await this.articleService.postArticle(req, res);

        logResponse(postArticleStatus);

        res.status(StatusCodes.OK).json(postArticleStatus);

    }

    private articleService: ArticleService = new ArticleService();
}