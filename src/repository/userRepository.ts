import 'reflect-metadata';
import {User} from "../entity/User";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(User)
export class userRepository extends Repository<User>{

    async findUserByLogin(login_: string): Promise<User> {
        let foundUser: User;
        foundUser = await this.findOne({
            where: {login: login_}
        })

        return foundUser;
    }

    async findUserById(id_: number): Promise<User> {
        let foundUser: User;
        foundUser = await this.findOne({
            where: {id: id_}
        })

        return foundUser;
    }



    async addUser(user: User): Promise<void> {
        await this.save(user);
    }

}