const Database = require('./shared/academia-management-context');
const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-body');
const app = new Koa();
// criar pastas rotas públicas e privadas

(async () => {
    await Database.connect();

    app.use(cors({
        origin: "*",
        allowMethods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
    }));

    app.use(bodyParser());

    // importar pastas de rotas públicas e privadas

    app.listen(process.env.PORT || 4000);
})()