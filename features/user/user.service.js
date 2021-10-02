const userRepository = require('./user.repository');
const filterHeper = require('../../shared/helpers/filter');
const pagingHelper = require('../../shared/helpers/paging');
const bcrypt = require('bcrypt');

class Service {

    async find(conditions) {
        const queryString = filterHeper.build(conditions);
        const paging = pagingHelper.build(conditions);

        const total = await userRepository.countDocuments(queryString);
        const data = await userRepository.find(queryString, paging);

        data.forEach(user => {
            delete user.password;
        });

        return {
            meta: pagingHelper.resolve(paging, total),
            data
        }
    }

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

    update(id, properties) {
        return userRepository.update(id, properties);
    }

    delete(id) {
        return userRepository.delete(id);
    }

}

module.exports = new Service();