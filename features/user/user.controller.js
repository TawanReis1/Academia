const { onError, onSuccess, onBadRequest, onCreated } = require('../../shared/handlers');
const service = require('./user.service');

class Controller {

    async list(ctx) {
        try {
            // Chamando service para listar dados na base.
            let res = await service.find(ctx.query);

            return onSuccess(res.meta, res.data, ctx);
        } catch (err) {
            return onError('Error trying to list users', err.toString(), ctx);
        }
    }

    async getById(ctx) {
        try {
            let res = await service.get(ctx.params.id);
            res.password = null;

            return onSuccess({}, res, ctx);
        } catch (err) {
            return onError('Error trying to get user by id', err.toString(), ctx);
        }
    }

    async create(ctx) {
        try {
            // Realizando validações no request.
            if (!ctx.request.body.name) return onBadRequest('Name cannot be null', ctx);
            if (!ctx.request.body.email) return onBadRequest('E-mail cannot be null', ctx);
            if (!ctx.request.body.password) return onBadRequest('Password cannot be null', ctx);

            if (!ctx.request.body.document)
            {
                return onBadRequest('Document cannot be null', ctx);
            } else if (ctx.request.body.document.length > 14)
            {
                return onBadRequest('Document must not be greater than 14 characters.', ctx);
            }
             

            let res = await service.post(ctx.request.body);

            return onCreated(ctx, res);
        } catch (err) {
            return onError('Error trying to create an user', err.toString(), ctx);
        }
    }
}

module.exports = new Controller();