import 'reflect-metadata';
import express from 'express';
import {UserService} from "../service/UserService";
import {StatusCodes} from "http-status-codes";

export class UserController {

    async createUser(req: express.Request, res: express.Response) {

        const outMessage: object = await this.userService.regNewUser(req.body);
        console.log(outMessage);

        res.status(StatusCodes.OK).json(outMessage);
    }


    async loginUser(req: express.Request, res: express.Response) {

        const outMessage: object = await this.userService.authenticateUser(req.body);
        console.log(outMessage);

        if (outMessage["status"] == "ok") {
            res.cookie("token", outMessage["token"]);
        }

        return res.status(StatusCodes.OK).json(outMessage);
    }


    private userService: UserService = new UserService();
}


