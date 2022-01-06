import 'reflect-metadata';
import express from 'express';
import {UserService} from "../service/userService";

export class UserController {

    async createUser(req: express.Request, res: express.Response) {

        let outMessage: object =  await this.userService.regNewUser(req.body);
        console.log(outMessage);

        if (outMessage["status"] == "fail"){
            return res.status(400).json(outMessage);
        }
        return res.status(200).json(outMessage);
    }

    private userService : UserService = new UserService();
}


