import "reflect-metadata";
import * as http from 'http';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import {v4 as uuidv4} from 'uuid';
import cookieParser from 'cookie-parser';

import {UserController} from "./controller/user.controller";
import {createConnection} from "typeorm";

createConnection().then(async connection => {

    const PORT: number = 10000;

// save cookies for 1000 days
    const timeToSave: number = 60 * 60 * 24 * 1000;

    const app: express.Application = express();
    const server: http.Server = http.createServer(app);

    app.use(session({
        secret: uuidv4().toString(),
        saveUninitialized: true,
        cookie: {maxAge: timeToSave},
        resave: false
    }));
    app.use(cookieParser());

//enable cors-policy
    app.use(cors());

// enable json-parse middleware
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));


    app.get('/', (req: express.Request, res: express.Response): void => {
        console.log(req.session);
        if (req.session.id) {
            console.log(`Success ${req.session.id}`)
        }
        res.status(200).send('Okay');
    })

    const cont = new UserController();

    app.post('/us', cont.createUser);

    server.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })

}).catch(error => console.log("TypeORM connection error with database: ", error));