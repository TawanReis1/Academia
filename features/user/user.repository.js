const { User } = require('./user.model'); 

class Repository {
    findOne(request) {
        return User.findOne(request);
    }

    create(user) {
        return User.create(user);
    }
}

module.exports = new Repository();