const boom = require('boom')
const User = require('./user.model')
const Checkout = require('../checkout/checkout.model')

// // // //

// Default pagination options
function getPaginationParams (req) {
    let page = Number(req.query.page) || 0;
    let per_page = Number(req.query.per_page) || 10;
    let offset = per_page * page;
    return { page, per_page, offset }
}

/**
* @api {get} /api/users Profile
* @APIname Profile
* @APIgroup User Controller
* @apidescription Gets profile of the current User
* @apiSuccess {json} User's profile
* @apiError (Error) 500 Internal server error
*/
exports.profile = (req, res) => {
    return User.findOne({ username: req.user.username }, '-password -__v').exec()
    .then( (user) => { res.json(user) })
}

/**
* @api {get} /api/users Index
* @APIname Index
* @APIgroup User Controller
* @apidescription Gets list of current Users
* @apiSuccess {json} Collection of Users
* @apiError (Error) 500 Internal server error
*/
module.exports.list = (req, res, next) => {
    // Gets pagination variables for query
    const { page, per_page, offset } = getPaginationParams(req);

    return User
    .find({})
    .limit(per_page)
    .skip(offset)
    .lean()
    .exec()
    .then((response) => {
        return res
        .status(200)
        .json({
          page: page,
          per_page: per_page,
          items: response
        });
    })
    .catch( err => next(boom.badImplementation(err)) );
};



/**
* @api {get} /api/users/search Search
* @apiName search
* @apiGroup User Controller
* @apiDescription Gets a list of Users that match a search query
* @apiPermission authenticated
* @apiSuccess {Collection} root Collection of User records
* @apiError (500) UnknownException Could not retrieve User collection
*/
module.exports.search = (req, res) => {
    // Gets pagination variables for query
    const { page, per_page, offset } = getPaginationParams(req);

    // Assigns query for search
    // let query = req.query.search || ''

    // Ensures correct type casting for query
    // if (query.year) {
    //   query.year['$in'] = _.map(query.year['$in'], (yr) => { return Number(yr) })
    // }


    let textSearch = req.query.search || ''

    const matchQuery = [
        { email: new RegExp(textSearch, 'i') },
        { username: new RegExp(textSearch, 'i') },
    ]

    // Assigns matchQuery to queryObject
    // query = {}
    // query['$and'] = [
    //     { '$or': matchQuery }
    // ]

    const query = { '$or': matchQuery }

    return User.find(query)
    .limit(per_page)
    .skip(offset)
    .lean()
    .exec()
    .then((items) => {
        return res
        .status(200)
        .json({ page, per_page, count: 100, items })
    })
    .catch( err => next(boom.badImplementation(err)) );
};




/**
* @api {POST} /api/users Create
* @APIname Create
* @APIgroup User Controller
* @apidescription Creates a new User
* @apiSuccess {json} The newly created User
* @apiError (Error) 500 Internal server error
*/
module.exports.create = (req, res, next) => {
    return User.create(req.body)
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

/**
* @api {GET} /api/users/:id Show
* @APIname Show
* @APIgroup User Controller
* @apidescription Fetch a single User
* @apiSuccess {json} The requested User
* @apiError (Error) 500 Internal server error
*/
module.exports.show = (req, res, next) => {
    return User.findById(req.params.id)
    // .populate({ path: 'rentals', select: 'start_date' })
    .then((response) => {
        return res
        .status(200)
        .send(response)
        // .send(response.toJSON({ getters: true, virtuals: true }))
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

/**
* @api {GET} /api/users/:id/rentals showRentals
* @APIname showRentals
* @APIgroup User Controller
* @apidescription Gets related Rentals
* @apiSuccess {json} The related Checkouts models
* @apiError (Error) 500 Internal server error
*/
module.exports.showRentals = (req, res, next) => {
    return Checkout
    .find({ renter_id: req.params.id })
    .populate({ path: 'check_out_librarian', select: 'email' })
    .populate({ path: 'check_in_librarian', select: 'email' })
    .populate({ path: 'renter', select: 'email' })
    .populate({ path: 'book', select: 'slug' })
    .then((checkouts) => {
        return res
        .status(200)
        .send(checkouts)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

/**
* @api {PUT} /api/users/:id Update
* @APIname Update
* @APIgroup User Controller
* @apidescription Update a single User
* @apiSuccess {json} The updated User
* @apiError (Error) 500 Internal server error
*/
module.exports.update = (req, res, next) => {
    return User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

/**
* @api {DELETE} /api/users/:id Destroy
* @APIname Destroy
* @APIgroup User Controller
* @apidescription Destroy a single User
* @apiSuccess {json} The destroyed User
* @apiError (Error) 500 Internal server error
*/
module.exports.delete = (req, res, next) => {
    return User.remove({ _id: req.params.id })
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};
