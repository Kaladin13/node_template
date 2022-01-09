import {ArticleRepository} from "../../database_handling/repository/ArticleRepository";
import {getCustomRepository} from "typeorm";
import {Article} from "../../database_handling/entity/Article";
import express from "express";
import {ArticleInfo} from "../../database_handling/model/dto/ArticleInfo";
import {UserRepository} from "../../database_handling/repository/UserRepository";
import {ResponseMapper} from "../mapper/ResponseMapper";
import {ResponseStatuses} from "./StatusEnums/ResponseStatuses";
import {Logger} from "../../logging/Logger";


export class ArticleService {

    async getUserArticles(req: express.Request): Promise<ArticleInfo[]> {

        const userArticles: Article[] =
            await this.articleRepository.getAllUserArticles(Number(req.params.id));

        let articlesInfo: ArticleInfo[] = [];

        for (let article of userArticles) {
            articlesInfo.push(new ArticleInfo(
                article.id,
                article.title,
                article.user.login,
                article.description
            ));
        }

        return articlesInfo;
    }

    async postArticle(req: express.Request, res: express.Response): Promise<ResponseMapper> {

        let article: Article = this.articleRepository.create();

        let reqBodyValue = {
            title: null,
            description: null,
            content: null
        }

        try {
            reqBodyValue = JSON.parse(req.body.value)
        }
        catch (e) {
            Logger.error(new Error(e));
        }


        if (reqBodyValue.title != null) {
            article.title = reqBodyValue.title;
        }

        // in case of undefined we set to null
        if (reqBodyValue.description != null) {
            article.description = reqBodyValue.description;
        } else {
            article.description = null;
        }

        if (reqBodyValue.content != null) {
            article.content = reqBodyValue.content;
        }

        article.user = res.locals.parsedCookie.additional;

        return this.articleRepository.postNewArticle(article).then( () => {
            return new ResponseMapper(ResponseStatuses.Ok,
                "Article is successfully added",
                article);
        }).catch((error) => {
            Logger.error(new Error(error));
            return new ResponseMapper(ResponseStatuses.Fail,
                "invalid request");
        });
    }

    private userRepository: UserRepository = getCustomRepository(UserRepository);
    private articleRepository: ArticleRepository = getCustomRepository(ArticleRepository);
}