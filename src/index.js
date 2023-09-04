import Koa from 'koa';
import Router from 'koa-router';
import serviceLocator from './service_locator';
import { db, initDB } from './config/database';
import cors from '@koa/cors';
import bodyParser from './common/body_parser';
import { errorMiddleware } from './middleware/index';

// Controller 주입
import { controllers }from './controllers'
// Service 주입

const initServiceLocator = () => {

}


const initServer = async () => {
    try {
        const app = new Koa();
        const router = new Router();
        initDB();
        serviceLocator.router = router;
        serviceLocator.db = db;
        app.use(async (ctx, next) => {
            // AWS alb health check
            if (ctx.request.path === '/ping') {
                ctx.body = 'pong';
            }
            await next();
        });
        app.use(bodyParser());
        app.use(errorMiddleware());
        controllers();
        app.use(cors());
        app.use(router.routes());
        app.use(router.allowedMethods());

        // next();
        console.log('listening...');
        await app.listen(3000);

    }catch(err){
        console.log(err);
    }
    
    
}
initServiceLocator();
initServer();
