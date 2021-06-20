const userRoutes = require('../features/user/user.route');

class Routing {
    resolve(app) {
        app.use(userRoutes.routes());
    }    
}

module.exports = new Routing();