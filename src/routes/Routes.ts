import express from "express";
import {UserController} from "../endpoints_handling/controller/UserController";
import {PageController} from "../endpoints_handling/controller/PageController";
import {MiddlewareController} from "../endpoints_handling/controller/MiddlewareController";
import {createConnection} from "typeorm";
import {Logger} from "../logging/Logger";
import {ArticleController} from "../endpoints_handling/controller/ArticleController";


export const router: express.Router = express.Router();

createConnection().then(async connection => {

const userController: UserController = new UserController();

const pageController: PageController = new PageController();

const middlewareController: MiddlewareController = new MiddlewareController();

const articleController: ArticleController = new ArticleController();

// middleware for all '/user/*' requests to parse cookies
router.param('id', async (req: express.Request, res: express.Response, next: express.NextFunction, id: number) => {
    await middlewareController.middlewareParseCookies(req, res, next, id);
});


router.post('/reg', async (req: express.Request, res: express.Response) => {
    await userController.createUser(req, res);
});


router.post('/login', async (req: express.Request, res: express.Response) => {
    await userController.loginUser(req, res);
});


router.get('/user/:id', async (req: express.Request, res: express.Response) => {
    await pageController.accessUserPage(req, res);
});

router.post('/user/:id', async (req: express.Request, res: express.Response) => {
    await articleController.postUserArticle(req, res);
})

}).catch(error => Logger.error(new Error(error)));