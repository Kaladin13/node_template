import "reflect-metadata";
import {EntityRepository, Repository} from "typeorm";
import {Article} from "../entity/Article";
import {User} from "../entity/User";


@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {

    async getAllUserArticles(user: User): Promise<Article[]> {
        return this.find({
            where: {
                user: { id: user.id }
            },
            relations: ["user"]
        });
    }

}