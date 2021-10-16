const Router = require('koa-router');
const controller = require('./gymEquipment.controller');
const guard = require('../../shared/middlewares/academia-middleware');
 
const routes = new Router();

routes.prefix(`/api/${process.env.BASE_API}/gym-equipment`);

routes.post('/', guard.Authorize, controller.create);

module.exports = routes;
