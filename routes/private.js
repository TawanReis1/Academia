const userRoutes = require('../features/user/user.route');
const gymEquipmentRoutes = require('../features/gymEquipment/gymEquipment.route')

class Routing {
    resolve(app) {
        app.use(userRoutes.routes());
        app.use(gymEquipmentRoutes.routes());     
    }    
}

module.exports = new Routing();