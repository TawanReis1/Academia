const Database = require('./shared/academia-management-context');
const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-body');
const app = new Koa();
const publicRoutes = requre('./routes/public');
const privateRoutes = require('./routes/private');

(async () => {
    await Database.connect();

    app.use(cors({
        origin: "*",
        allowMethods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
    }));

    app.use(bodyParser());

    publicRoutes.resolve(app);
    privateRoutes.resolve(app);

    app.listen(process.env.PORT || 4000);
})()