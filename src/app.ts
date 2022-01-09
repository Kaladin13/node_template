import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import {v4 as uuidv4} from 'uuid';
import cookieParser from 'cookie-parser';

import {PORT, TIME_TO_SAVE_COOKIES} from "./property/ConstantValues";
import {Logger} from "./logging/Logger";
import {router} from "./routes/Routes";



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

    // routes are configured in routing directory,
    // just exporting them here
    app.use(router);

    app.listen(PORT, () => {
        Logger.info("Server successfully started on port %s", PORT);
    })

