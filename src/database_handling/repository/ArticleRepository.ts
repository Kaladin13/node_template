import "reflect-metadata";
import {EntityRepository, Repository} from "typeorm";
import {Article} from "../entity/Article";


@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {

    async getAllUserArticles(userId: number): Promise<Article[]> {
        return this.find({
            where: {
                user: { id: userId }
            },
            relations: ["user"]
        });
    }

}