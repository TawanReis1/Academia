const Mongoose = require('mongoose');

Mongoose.Promise = global.Promise;

const mongoConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

class AcademiaManagementContext {

    static get conn() {
        if (!AcademiaManagementContext.connection) {
            AcademiaManagementContext.connect()
        }
        return AcademiaManagementContext.connection;
    }

    static connect() {
        const cs = process.env.MONGO_ACADEMIA_MANAGEMENT;
        AcademiaManagementContext.connection = Mongoose.createConnection(cs, mongoConfig);
    }
}

module.exports = AcademiaManagementContext;