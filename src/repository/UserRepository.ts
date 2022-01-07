import 'reflect-metadata';
import {User} from "../entity/User";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async findUserByLogin(userLogin: string): Promise<User> {
        return await this.findOne({
            where: {login: userLogin}
        })
    }

    async findUserById(userId: number): Promise<User> {
        return await this.findOne({
            where: {id: userId}
        })
    }

    async addUser(user: User): Promise<void> {
        await this.insert(user);
    }

}