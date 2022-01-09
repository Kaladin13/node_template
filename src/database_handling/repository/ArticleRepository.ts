import "reflect-metadata";
import {EntityRepository, Repository} from "typeorm";
import {Article} from "../entity/Article";


@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {

    async getAllUserArticles(userId: number): Promise<Article[]> {
        return await this.find({
            where: {
                user: { id: userId }
            },
            relations: ["user"]
        });
    }

    async postNewArticle(article: Article): Promise<void> {
        await this.insert(article);
    }

    async updateArticle(article: Article): Promise<void> {
        await this.save(article);
    }

}