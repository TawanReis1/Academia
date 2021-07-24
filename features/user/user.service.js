const userRepository = require('./user.repository');
const bcrypt = require('bcrypt');

class Service {

    getById(id) {
        let objectRequest = {
            _id: id
        }

        return userRepository.findOne(objectRequest);
    }

    getByEmail(email) {
        let objectRequest = {
            email: email
        }

        return userRepository.findOne(objectRequest);
    }

    post(user) {
        user.password = bcrypt.hashSync(user.password, 10);

        return userRepository.create(user); 
    }

}

module.exports = new Service();