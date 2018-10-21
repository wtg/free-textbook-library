const boom = require('boom')
const Book = require('./book.model')
const BookType = require('../book_type/book_type.model')
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
* @api {get} /api/books Index
* @APIname Index
* @APIgroup Book Controller
* @apidescription Gets list of current Books
* @apiSuccess {json} Collection of Books
* @apiError (Error) 500 Internal server error
*/
module.exports.list = (req, res, next) => {
    // Gets pagination variables for query
    const { page, per_page, offset } = getPaginationParams(req);

    return Book
    .find({})
    .populate({ path: 'book_type', select: 'title' })
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
* @api {get} /api/books/search Search
* @apiName search
* @apiGroup Book Controller
* @apiDescription Gets a list of Books that match a search query
* @apiPermission authenticated
* @apiSuccess {Collection} root Collection of Book records
* @apiError (500) UnknownException Could not retrieve Book collection
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
        { slug: new RegExp(textSearch, 'i') },
        { status: new RegExp(textSearch, 'i') },
    ]

    // Assigns matchQuery to queryObject
    // query = {}
    // query['$and'] = [
    //     { '$or': matchQuery }
    // ]

    const query = { '$or': matchQuery }

    return Book.find(query)
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
* @api {POST} /api/books Create
* @APIname Create
* @APIgroup Book Controller
* @apidescription Creates a new Book
* @apiSuccess {json} The newly created Book
* @apiError (Error) 500 Internal server error
*/
module.exports.create = (req, res, next) => {
    return new Book(req.body).save()
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

/**
* @api {GET} /api/books/:id Show
* @APIname Show
* @APIgroup Book Controller
* @apidescription Fetch a single Book
* @apiSuccess {json} The requested Book
* @apiError (Error) 500 Internal server error
*/
module.exports.show = (req, res, next) => {
    return Book.findById(req.params.id)
    .populate({ path: 'book_type', select: 'title' })
    // .populate({ path: 'checkouts', select: 'start_date' })
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
* @api {GET} /api/books/:id/book_type showBookType
* @APIname showBookType
* @APIgroup Book Controller
* @apidescription Gets related Book Type
* @apiSuccess {json} The related Book Type model
* @apiError (Error) 500 Internal server error
*/
module.exports.showBookType = (req, res, next) => {
    return Book.findById(req.params.id)
    .then((book) => {

        return BookType.findById(book.book_type_id)
        .then((book_type) => {
            return res
            .status(200)
            .send(book_type)
            .end();
        })
        .catch( err => next(boom.badImplementation(err)) );

    })
    .catch( err => next(boom.badImplementation(err)) );
};

/**
* @api {GET} /api/books/:id/checkouts showCheckouts
* @APIname showCheckouts
* @APIgroup Book Controller
* @apidescription Gets related Checkouts
* @apiSuccess {json} The related Checkouts models
* @apiError (Error) 500 Internal server error
*/
module.exports.showCheckouts = (req, res, next) => {
    return Checkout
    .find({ book_id: req.params.id })
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
* @api {PUT} /api/books/:id Update
* @APIname Update
* @APIgroup Book Controller
* @apidescription Update a single Book
* @apiSuccess {json} The updated Book
* @apiError (Error) 500 Internal server error
*/
module.exports.update = (req, res, next) => {
    return Book.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

/**
* @api {DELETE} /api/books/:id Destroy
* @APIname Destroy
* @APIgroup Book Controller
* @apidescription Destroy a single Book
* @apiSuccess {json} The destroyed Book
* @apiError (Error) 500 Internal server error
*/
module.exports.delete = (req, res, next) => {
    return Book.remove({ _id: req.params.id })
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};
