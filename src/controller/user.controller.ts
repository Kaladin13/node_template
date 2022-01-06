import 'reflect-metadata';
import express from 'express';
import {userRepository} from "../repository/userRepository";
import {getCustomRepository} from "typeorm";
import {User} from "../entity/User";

export class UserController {

    async createUser(req: express.Request, res: express.Response) {

        const user: User = this.userRep.create();
        user.login = req.body.login;
        user.password = req.body.password;
        await this.userRep.addUser(user);
        console.log(user);
        res.status(200).json(user);
    }

    private userRep: userRepository = getCustomRepository(userRepository);
}


