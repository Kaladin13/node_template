import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import {v4 as uuidv4} from 'uuid';
import cookieParser from 'cookie-parser';

import {UserController} from "./controller/UserController";
import {createConnection} from "typeorm";
import {PageController} from "./controller/PageController";
import {PORT, TIME_TO_SAVE_COOKIES} from "./property/ConstantValues";
import {Logger} from "./logging/Logger";

createConnection().then(async connection => {

    const app: express.Application = express();

    app.use(session({
        secret: uuidv4().toString(),
        saveUninitialized: true,
        cookie: {maxAge: TIME_TO_SAVE_COOKIES},
        resave: false
    }));

    app.use(cookieParser());

//enable cors-policy
    app.use(cors());

// enable json-parse middleware
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));


    // pass connection object here to configure
    // multiple databases
    const userController: UserController = new UserController();

    const pageController: PageController = new PageController();


    // middleware for all '/user/*' requests to parse cookies
    app.param('id', async (req: express.Request, res: express.Response, next: express.NextFunction, id: number) => {
        await pageController.middlewareParseCookies(req, res, next, id);
    });


    app.post('/reg', async (req: express.Request, res: express.Response) => {
        await userController.createUser(req, res);
    });

    app.post('/login', async (req: express.Request, res: express.Response) => {
        await userController.loginUser(req, res);
    });

    app.get('/user/:id', async (req: express.Request, res: express.Response) => {
        await pageController.accessUserPage(req, res);
    });


    app.listen(PORT, () => {
        Logger.info("Server successfully started on port %s", PORT);
    })

}).catch(error => Logger.error(new Error(error)));