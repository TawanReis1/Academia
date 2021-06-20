const userRepository = require('./user.repository');
const bcrypt = require('bcrypt');

class Service {

    get(id) {
        let objectRequest = {
            _id: id
        }

        return userRepository.findOne(objectRequest);
    }

    post(user) {
        console.log('entrou na service');
        user.password = bcrypt.hashSync(user.password, 10);

        return userRepository.create(user);
    }

}

module.exports = new Service();