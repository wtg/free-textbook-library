const boom = require('boom')
const Checkout = require('./checkout.model')
const User = require('../user/user.model')
const Book = require('../book/book.model')

// // // //

// Default pagination options
function getPaginationParams (req) {
    let page = Number(req.query.page) || 0;
    let per_page = Number(req.query.per_page) || 10;
    let offset = per_page * page;
    return { page, per_page, offset }
}


/**
* @api {get} /api/checkouts Index
* @APIname Index
* @APIgroup Checkout Controller
* @apidescription Gets list of current Checkouts
* @apiSuccess {json} Collection of Checkouts
* @apiError (Error) 500 Internal server error
*/
module.exports.list = (req, res, next) => {
    // Gets pagination variables for query
    const { page, per_page, offset } = getPaginationParams(req);

    return Checkout
    .find({})
    .populate({ path: 'check_out_librarian', select: 'email' })
    .populate({ path: 'check_in_librarian', select: 'email' })
    .populate({ path: 'renter', select: 'email' })
    .populate({ path: 'book', select: 'slug' })
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
* @api {get} /api/checkouts/search Search
* @apiName search
* @apiGroup Checkout Controller
* @apiDescription Gets a list of Checkouts that match a search query
* @apiPermission authenticated
* @apiSuccess {Collection} root Collection of Checkout records
* @apiError (500) UnknownException Could not retrieve Checkout collection
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
        { status: new RegExp(textSearch, 'i') },
    ]

    // Assigns matchQuery to queryObject
    // query = {}
    // query['$and'] = [
    //     { '$or': matchQuery }
    // ]

    const query = { '$or': matchQuery }

    return Checkout.find(query)
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
* @api {POST} /api/checkouts Create
* @APIname Create
* @APIgroup Checkout Controller
* @apidescription Creates a new Checkout
* @apiSuccess {json} The newly created Checkout
* @apiError (Error) 500 Internal server error
*/
module.exports.create = (req, res, next) => {
    return new Checkout(req.body).save()
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

/**
* @api {GET} /api/checkouts/:id Show
* @APIname Show
* @APIgroup Checkout Controller
* @apidescription Fetch a single Checkout
* @apiSuccess {json} The requested Checkout
* @apiError (Error) 500 Internal server error
*/
module.exports.show = (req, res, next) => {
    return Checkout.findById(req.params.id)
    .populate({ path: 'check_out_librarian', select: 'email' })
    .populate({ path: 'check_in_librarian', select: 'email' })
    .populate({ path: 'renter', select: 'email' })
    .populate({ path: 'book', select: 'slug' })
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
* @api {GET} /api/checkouts/:id/check_out_librarian showCheckOutLibrarian
* @APIname showCheckOutLibrarian
* @APIgroup Checkout Controller
* @apidescription Gets related Check Out Librarian
* @apiSuccess {json} The related User model
* @apiError (Error) 500 Internal server error
*/
module.exports.showCheckOutLibrarian = (req, res, next) => {
    return Checkout.findById(req.params.id)
    .then((checkout) => {

        return User.findById(checkout.check_out_librarian_id)
        .then((user) => {
            return res
            .status(200)
            .send(user)
            .end();
        })
        .catch( err => next(boom.badImplementation(err)) );

    })
    .catch( err => next(boom.badImplementation(err)) );
};

/**
* @api {GET} /api/checkouts/:id/check_in_librarian showCheckInLibrarian
* @APIname showCheckInLibrarian
* @APIgroup Checkout Controller
* @apidescription Gets related Check In Librarian
* @apiSuccess {json} The related User model
* @apiError (Error) 500 Internal server error
*/
module.exports.showCheckInLibrarian = (req, res, next) => {
    return Checkout.findById(req.params.id)
    .then((checkout) => {

        return User.findById(checkout.check_in_librarian_id)
        .then((user) => {
            return res
            .status(200)
            .send(user)
            .end();
        })
        .catch( err => next(boom.badImplementation(err)) );

    })
    .catch( err => next(boom.badImplementation(err)) );
};

/**
* @api {GET} /api/checkouts/:id/renter showRenter
* @APIname showRenter
* @APIgroup Checkout Controller
* @apidescription Gets related Renter
* @apiSuccess {json} The related User model
* @apiError (Error) 500 Internal server error
*/
module.exports.showRenter = (req, res, next) => {
    return Checkout.findById(req.params.id)
    .then((checkout) => {

        return User.findById(checkout.renter_id)
        .then((user) => {
            return res
            .status(200)
            .send(user)
            .end();
        })
        .catch( err => next(boom.badImplementation(err)) );

    })
    .catch( err => next(boom.badImplementation(err)) );
};

/**
* @api {GET} /api/checkouts/:id/book showBook
* @APIname showBook
* @APIgroup Checkout Controller
* @apidescription Gets related Book
* @apiSuccess {json} The related Book model
* @apiError (Error) 500 Internal server error
*/
module.exports.showBook = (req, res, next) => {
    return Checkout.findById(req.params.id)
    .then((checkout) => {

        return Book.findById(checkout.book_id)
        .populate({ path: 'book_type', select: 'title' })
        .then((book) => {
            return res
            .status(200)
            .send(book)
            .end();
        })
        .catch( err => next(boom.badImplementation(err)) );

    })
    .catch( err => next(boom.badImplementation(err)) );
};


/**
* @api {PUT} /api/checkouts/:id Update
* @APIname Update
* @APIgroup Checkout Controller
* @apidescription Update a single Checkout
* @apiSuccess {json} The updated Checkout
* @apiError (Error) 500 Internal server error
*/
module.exports.update = (req, res, next) => {
    return Checkout.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

/**
* @api {DELETE} /api/checkouts/:id Destroy
* @APIname Destroy
* @APIgroup Checkout Controller
* @apidescription Destroy a single Checkout
* @apiSuccess {json} The destroyed Checkout
* @apiError (Error) 500 Internal server error
*/
module.exports.delete = (req, res, next) => {
    return Checkout.remove({ _id: req.params.id })
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};
