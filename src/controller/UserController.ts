import 'reflect-metadata';
import express from 'express';
import {UserService} from "../service/UserService";
import {StatusCodes} from "http-status-codes";
import {Logger} from "../logging/Logger";
import {ResponseMapper} from "../mapper/ResponseMapper";
import {ResponseStatuses} from "../service/StatusEnums/ResponseStatuses";
import {logResponse} from "../logging/ResponseLogging";

export class UserController {

    async createUser(req: express.Request, res: express.Response) {

        const responseMessage: ResponseMapper = await this.userService.regNewUser(req);

        logResponse(responseMessage);

        res.status(StatusCodes.OK).json(responseMessage);
    }


    async loginUser(req: express.Request, res: express.Response) {

        const responseMapper: ResponseMapper = await this.userService.authenticateUser(req);

        logResponse(responseMapper);

        if (responseMapper.status == ResponseStatuses.Ok) {
            res.cookie("token", responseMapper.additional.token);
        }

        return res.status(StatusCodes.OK).json(responseMapper);
    }


    private userService: UserService = new UserService();
}


