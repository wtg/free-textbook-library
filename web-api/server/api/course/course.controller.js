const boom = require('boom')
const Course = require('./course.model')
const BookType = require('../book_type/book_type.model')

// // // //

// Default pagination options
function getPaginationParams (req) {
    let page = Number(req.query.page) || 0;
    let per_page = Number(req.query.per_page) || 10;
    let offset = per_page * page;
    return { page, per_page, offset }
}


/**
* @api {get} /api/courses Index
* @APIname Index
* @APIgroup Course Controller
* @apidescription Gets list of current Courses
* @apiSuccess {json} Collection of Courses
* @apiError (Error) 500 Internal server error
*/
module.exports.list = (req, res, next) => {
    // Gets pagination variables for query
    const { page, per_page, offset } = getPaginationParams(req);

    // Only pull courses that have requires or recommended books
    const booksQuery = { $exists: true, $not: { $size: 0 } }
    const coursesQuery = {
        $or: [
          { required_book_ids: booksQuery },
          { recommended_book_ids: booksQuery }
        ]
    }

    return Course.find(coursesQuery)
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
* @api {get} /api/courses/search Search
* @apiName search
* @apiGroup Course Controller
* @apiDescription Gets a list of Courses that match a search query
* @apiPermission authenticated
* @apiSuccess {Collection} root Collection of Course records
* @apiError (500) UnknownException Could not retrieve Course collection
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
        { label: new RegExp(textSearch, 'i') },
        { subject_code: new RegExp(textSearch, 'i') },
    ]

    // Assigns matchQuery to queryObject
    // query = {}
    // query['$and'] = [
    //     { '$or': matchQuery }
    // ]

    const query = { '$or': matchQuery }

    return Course.find(query)
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
* @api {POST} /api/courses Create
* @APIname Create
* @APIgroup Course Controller
* @apidescription Creates a new Course
* @apiSuccess {json} The newly created Course
* @apiError (Error) 500 Internal server error
*/
module.exports.create = (req, res, next) => {
    return new Course(req.body).save()
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

/**
* @api {GET} /api/courses/:id Show
* @APIname Show
* @APIgroup Course Controller
* @apidescription Fetch a single Course
* @apiSuccess {json} The requested Course
* @apiError (Error) 500 Internal server error
*/
module.exports.show = (req, res, next) => {
    return Course.findById(req.params.id)
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
* @api {GET} /api/courses/:id/book_types showBookTypes
* @APIname showBookTypes
* @APIgroup Course Controller
* @apidescription Gets related BookTypes
* @apiSuccess {json} The related BookTypes
* @apiError (Error) 500 Internal server error
*/
// TODO - this must be refactored to do: RelatedModel.find({ _id: [1,2,3] })
module.exports.showRequiredBooks = (req, res, next) => {

    return Course.findById(req.params.id)
    .then((response) => {
        return BookType
        .find({ _id: response.required_book_ids })
        .then((book_types) => {
            return res
            .status(200)
            .send(book_types)
            .end();
        })
        .catch( err => next(boom.badImplementation(err)) );
    })
    .catch( err => next(boom.badImplementation(err)) );

};


/**
* @api {GET} /api/courses/:id/book_types showBookTypes
* @APIname showBookTypes
* @APIgroup Course Controller
* @apidescription Gets related BookTypes
* @apiSuccess {json} The related BookTypes
* @apiError (Error) 500 Internal server error
*/
// TODO - this must be refactored to do: RelatedModel.find({ _id: [1,2,3] })
module.exports.showRecommendedBooks = (req, res, next) => {

    return Course.findById(req.params.id)
    .then((response) => {
        return BookType
        .find({ _id: response.recommended_book_ids })
        .then((book_types) => {
            return res
            .status(200)
            .send(book_types)
            .end();
        })
        .catch( err => next(boom.badImplementation(err)) );
    })
    .catch( err => next(boom.badImplementation(err)) );

};


/**
* @api {PUT} /api/courses/:id Update
* @APIname Update
* @APIgroup Course Controller
* @apidescription Update a single Course
* @apiSuccess {json} The updated Course
* @apiError (Error) 500 Internal server error
*/
module.exports.update = (req, res, next) => {
    return Course.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

/**
* @api {DELETE} /api/courses/:id Destroy
* @APIname Destroy
* @APIgroup Course Controller
* @apidescription Destroy a single Course
* @apiSuccess {json} The destroyed Course
* @apiError (Error) 500 Internal server error
*/
module.exports.delete = (req, res, next) => {
    return Course.remove({ _id: req.params.id })
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};
