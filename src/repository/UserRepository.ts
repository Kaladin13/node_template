import 'reflect-metadata';
import {User} from "../entity/User";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async findUserByLogin(login_: string): Promise<User> {
        return await this.findOne({
            where: {login: login_}
        })
    }

    async findUserById(id_: number): Promise<User> {
        return await this.findOne({
            where: {id: id_}
        })
    }

    async addUser(user: User): Promise<void> {
        await this.insert(user);
    }

}