const { onError, onSuccess, onBadRequest, onCreated, onForbidden, onNoContent } = require('../../shared/handlers');
const service = require('./user.service');
const jwt = require('../../shared/helpers/jwtValidator');

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
            let res = await service.getById(ctx.params.id);
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

            if (!ctx.request.body.document){
                return onBadRequest('Document cannot be null', ctx);
            } else if (ctx.request.body.document.length > 14){
                return onBadRequest('Document must not be greater than 14 characters.', ctx);
            }             

            let res = await service.post(ctx.request.body);

            return onCreated(ctx, res);
        } catch (err) {
            return onError('Error trying to create an user', err.toString(), ctx);
        }
    }

    async updateById(ctx) {
        try{
            // Realizando validações no request.
            if (!ctx.request.body.name) return onBadRequest('Name cannot be null', ctx);
            if (!ctx.request.body.email) return onBadRequest('E-mail cannot be null', ctx);
            if (!ctx.request.body.type) return onBadRequest('Type cannot be null', ctx);
            if (!ctx.request.body.document) return onBadRequest('Document cannot be null', ctx);

            let res = await service.update(ctx.params.id, ctx.request.body);
            
            if (ctx.request.body.name) res.name = ctx.request.body.name;
            if (ctx.request.body.email) res.email = ctx.request.body.email;
            if (ctx.request.body.type) res.type = ctx.request.body.type;
            if (ctx.request.body.document) res.document = ctx.request.body.document;

            res.password = null;
            return onSuccess({}, res, ctx);
        } catch (err) {
            return onError('Error trying to update an user', err.toString(), ctx);
        }
    }

    async deleteById(ctx) {
        let decodedToken = jwt.decode(ctx.request.header["x-access-token"]);

        let authenticatedUser = await service.getById(decodedToken.id);
        if (authenticatedUser.type != "ADMIN") return onForbidden(ctx);

        await service.delete(ctx.params.id);

        return onNoContent(ctx);
    }
}

module.exports = new Controller();