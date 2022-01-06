import "reflect-metadata";
import * as http from 'http';
import express, {NextFunction} from 'express';
import cors from 'cors';
import session from 'express-session';
import {v4 as uuidv4} from 'uuid';
import cookieParser from 'cookie-parser';

import {UserController} from "./controller/user.controller";
import {createConnection} from "typeorm";
import {AuthenticationToken} from "./webtoken/AuthenticationToken";
import {PageController} from "./controller/PageController";

createConnection().then(async connection => {

    const PORT: number = 10000;

    const app: express.Application = express();
    const server: http.Server = http.createServer(app);

    app.use(session({
        secret: uuidv4().toString(),
        saveUninitialized: true,
        cookie: {maxAge: AuthenticationToken.timeToSaveCookies},
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

    // pass connection object here to configure
    // multiple databases
    const userController: UserController = new UserController();

    const pageController: PageController = new PageController();

    app.post('/reg', async (req, res) => {
        await userController.createUser(req, res);
    });

    app.post('/login', async (req, res ) => {
        await userController.loginUser(req,res);
    });

    app.get('/user/:id', async (req , res, next) =>{
        await pageController.checkPersonalCookies(req, res, next);
    },
        async (req: express.Request, res: express.Response) =>{
            await pageController.accessPersonalPage(req, res);
    });

    server.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })

}).catch(error => console.log("TypeORM connection error with database: ", error));