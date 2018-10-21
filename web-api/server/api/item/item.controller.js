const boom = require('boom')
const Item = require('./item.model')
const Book = require('../book/book.model')
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
* @api {get} /api/items Index
* @APIname Index
* @APIgroup Item Controller
* @apidescription Gets list of current Items
* @apiSuccess {json} Collection of Items
* @apiError (Error) 500 Internal server error
*/
module.exports.list = (req, res, next) => {
    // Gets pagination variables for query
    const { page, per_page, offset } = getPaginationParams(req);

    return Item
    .find({})
    .populate({ path: 'book', select: 'title' })
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
* @api {POST} /api/items Create
* @APIname Create
* @APIgroup Item Controller
* @apidescription Creates a new Item
* @apiSuccess {json} The newly created Item
* @apiError (Error) 500 Internal server error
*/
module.exports.create = (req, res, next) => {
    return new Item(req.body).save()
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

/**
* @api {GET} /api/items/:id Show
* @APIname Show
* @APIgroup Item Controller
* @apidescription Fetch a single Item
* @apiSuccess {json} The requested Item
* @apiError (Error) 500 Internal server error
*/
module.exports.show = (req, res, next) => {
    return Item.findById(req.params.id)
    .populate({ path: 'book', select: 'title' })
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
* @api {GET} /api/items/:id/book showBook
* @APIname showBook
* @APIgroup Item Controller
* @apidescription Gets related Book
* @apiSuccess {json} The related Book model
* @apiError (Error) 500 Internal server error
*/
module.exports.showBook = (req, res, next) => {
    return Item.findById(req.params.id)
    .then((item) => {

        return Book.findById(item.book_id)
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
* @api {GET} /api/items/:id/checkouts showCheckouts
* @APIname showCheckouts
* @APIgroup Item Controller
* @apidescription Gets related Checkouts
* @apiSuccess {json} The related Checkouts models
* @apiError (Error) 500 Internal server error
*/
module.exports.showCheckouts = (req, res, next) => {
    return Checkout
    .find({ item_id: req.params.id })
    .populate({ path: 'check_out_librarian', select: 'email' })
    .populate({ path: 'check_in_librarian', select: 'email' })
    .populate({ path: 'renter', select: 'email' })
    .populate({ path: 'item', select: 'slug' })
    .then((checkouts) => {
        return res
        .status(200)
        .send(checkouts)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

/**
* @api {PUT} /api/items/:id Update
* @APIname Update
* @APIgroup Item Controller
* @apidescription Update a single Item
* @apiSuccess {json} The updated Item
* @apiError (Error) 500 Internal server error
*/
module.exports.update = (req, res, next) => {
    return Item.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

/**
* @api {DELETE} /api/items/:id Destroy
* @APIname Destroy
* @APIgroup Item Controller
* @apidescription Destroy a single Item
* @apiSuccess {json} The destroyed Item
* @apiError (Error) 500 Internal server error
*/
module.exports.delete = (req, res, next) => {
    return Item.remove({ _id: req.params.id })
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};
