const boom = require('boom')
const BookType = require('./book_type.model')
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
* @api {get} /api/book_types Index
* @APIname Index
* @APIgroup BookType Controller
* @apidescription Gets list of current Book Types
* @apiSuccess {json} Collection of Book Types
* @apiError (Error) 500 Internal server error
*/
module.exports.list = (req, res, next) => {
    // Gets pagination variables for query
    const { page, per_page, offset } = getPaginationParams(req);

    return BookType
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
* @api {get} /api/book_types/search Search
* @apiName search
* @apiGroup BookType Controller
* @apiDescription Gets a list of Book Types that match a search query
* @apiPermission authenticated
* @apiSuccess {Collection} root Collection of Book Type records
* @apiError (500) UnknownException Could not retrieve Book Type collection
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
        { title: new RegExp(textSearch, 'i') },
        { edition: new RegExp(textSearch, 'i') },
        { isbn_13: new RegExp(textSearch, 'i') },
        { isbn_10: new RegExp(textSearch, 'i') },
        { image_url: new RegExp(textSearch, 'i') },
    ]

    // Assigns matchQuery to queryObject
    // query = {}
    // query['$and'] = [
    //     { '$or': matchQuery }
    // ]

    const query = { '$or': matchQuery }

    return BookType.find(query)
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
* @api {POST} /api/book_types Create
* @APIname Create
* @APIgroup BookType Controller
* @apidescription Creates a new Book Type
* @apiSuccess {json} The newly created Book Type
* @apiError (Error) 500 Internal server error
*/
module.exports.create = (req, res, next) => {
    return new BookType(req.body).save()
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

/**
* @api {GET} /api/book_types/:id Show
* @APIname Show
* @APIgroup BookType Controller
* @apidescription Fetch a single Book Type
* @apiSuccess {json} The requested Book Type
* @apiError (Error) 500 Internal server error
*/
module.exports.show = (req, res, next) => {
    return BookType.findById(req.params.id)
    // .populate({ path: 'books', select: 'slug' })
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
* @api {GET} /api/book_types/:id/books showBooks
* @APIname showBooks
* @APIgroup BookType Controller
* @apidescription Gets related Books
* @apiSuccess {json} The related Books models
* @apiError (Error) 500 Internal server error
*/
module.exports.showBooks = (req, res, next) => {
    return Book
    .find({ book_type_id: req.params.id })
    .populate({ path: 'book_type', select: 'title' })
    .then((books) => {
        return res
        .status(200)
        .send(books)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

/**
* @api {PUT} /api/book_types/:id Update
* @APIname Update
* @APIgroup BookType Controller
* @apidescription Update a single Book Type
* @apiSuccess {json} The updated Book Type
* @apiError (Error) 500 Internal server error
*/
module.exports.update = (req, res, next) => {
    return BookType.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

/**
* @api {DELETE} /api/book_types/:id Destroy
* @APIname Destroy
* @APIgroup BookType Controller
* @apidescription Destroy a single Book Type
* @apiSuccess {json} The destroyed Book Type
* @apiError (Error) 500 Internal server error
*/
module.exports.delete = (req, res, next) => {
    return BookType.remove({ _id: req.params.id })
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};
