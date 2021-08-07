const loginRoutes = require('../features/login/login.route');

class Routing {
    resolve(app) {
        app.use(loginRoutes.routes());
    }    
}

module.exports = new Routing();