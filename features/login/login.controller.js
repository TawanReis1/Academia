const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const UserService = require('../user/user.service');
const { onError, onSuccess, onBadRequest } = require ('../../shared/handlers/');

class Controller {
    async login(ctx) {
        try {
            // Realizando validações
            const credentials = ctx.headers.authorization.replace('Basic ', '');
            const userAuth = Buffer.from(credentials, 'base64').toString();

            const [email, password] = userAuth.split(':');

            const user = await UserService.getByEmail(email);
            if (!user) return onBadRequest({message: 'Invalid e-mail'}, {});

            const isValidPassword = bcrypt.compareSync(password, user.password);
            if (!isValidPassword) return onBadRequest({message: 'Invalid password'}, {});

            // Gerando token
            const tokenDuration = 86400;

            const tokenPayload = {
                id: user._id
            };

            const expirationToken = {
                expiresIn: tokenDuration
            };

            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, expirationToken)

            // Montando resposta
            const responseBody = {
                type: 'Bearer',
                accessToken: token,
                expiresIn: tokenDuration,
                expiresDate: moment().add(23, 'hours').format('YYYY-MM-DDTHH:mm:ss')
            };

            return onSuccess({}, responseBody, ctx);

        } catch (err) {
            return onError('Error trying to login', err.toString(), ctx);
        }
    }
}

module.exports = new Controller();