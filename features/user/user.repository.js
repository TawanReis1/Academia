const { User } = require('./user.model'); 

class Repository {
    findOne(request) {
        return User.findOne(request);
    }

    create(user) {
        console.log('entrou na repository');
        return User.create(user);
    }
}

module.exports = new Repository();