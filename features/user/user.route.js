const Router = require('koa-router');
const controller = require('./user.controller');
const guard = require('../../shared/middlewares/academia-middleware');

const routes = new Router();

routes.prefix(`/api/${process.env.BASE_API}/user`)

routes.get('/', guard.Authorize, controller.list);
routes.get('/:id', guard.Authorize, controller.getById);
routes.post('/', guard.Authorize, controller.create);
routes.put('/:id', guard.Authorize, controller.updateById);
routes.delete('/:id', guard.Authorize, controller.deleteById);

module.exports = routes;