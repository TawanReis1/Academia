const loginRoutes = require('../features/login/login.route');

class Routing {
    resolve(app) {
        app.use(loginRoutes);
    }    
}

module.exports = new Routing();