import express from 'express';
import {UserDtoModel} from "../model/dto/userDto.model";


export class UserController {

    async createUser(req: express.Request, res: express.Response) {
        console.log(req.body);
        //console.log(req.query);
        const userDto: UserDtoModel = { login: req.body.login, password: req.body.password};
        console.log(userDto);
        res.status(200).send(JSON.stringify(userDto));
    }

}


