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
}

module.exports = new Repository();