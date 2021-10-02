const { User } = require('./user.model'); 

class Repository {

    find(query, paging) {
        return User.find(query)
        .limit(paging.limit)
        .skip(paging.skip)
        .sort(paging.sort)
        .lean();
    }

    findOne(request) {
        return User.findOne(request);
    }

    create(user) {
        return User.create(user);
    }

    countDocuments(query) {
        return User.countDocuments(query);
    }

    update(id, properties) {
        let objectId = {
            _id: id
        };

        return User.findOneAndUpdate(objectId, properties);
    }

    delete(id) {
        let objectId = {
            _id: id
        };

        return User.delete(objectId);
    }
}

module.exports = new Repository();