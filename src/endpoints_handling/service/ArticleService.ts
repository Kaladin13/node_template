import {ArticleRepository} from "../../database_handling/repository/ArticleRepository";
import {getCustomRepository} from "typeorm";
import {Article} from "../../database_handling/entity/Article";
import express from "express";
import {ArticleInfo} from "../../database_handling/model/dto/ArticleInfo";


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

    private articleRepository: ArticleRepository = getCustomRepository(ArticleRepository);
}