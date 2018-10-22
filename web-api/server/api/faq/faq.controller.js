const boom = require('boom')
const Faq = require('./faq.model')

// // // //

// Default pagination options
function getPaginationParams (req) {
    let page = Number(req.query.page) || 0;
    let per_page = Number(req.query.per_page) || 10;
    let offset = per_page * page;
    return { page, per_page, offset }
}


/**
* @api {get} /api/faqs Index
* @APIname Index
* @APIgroup Faq Controller
* @apidescription Gets list of current Faqs
* @apiSuccess {json} Collection of Faqs
* @apiError (Error) 500 Internal server error
*/
module.exports.list = (req, res, next) => {
    // Gets pagination variables for query
    const { page, per_page, offset } = getPaginationParams(req);

    return Faq
    .find({})
    .sort({ order: 1 })
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
* @api {get} /api/faqs/search Search
* @apiName search
* @apiGroup Faq Controller
* @apiDescription Gets a list of Faqs that match a search query
* @apiPermission authenticated
* @apiSuccess {Collection} root Collection of Faq records
* @apiError (500) UnknownException Could not retrieve Faq collection
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
        { question: new RegExp(textSearch, 'i') },
        { answer: new RegExp(textSearch, 'i') },
    ]

    // Assigns matchQuery to queryObject
    // query = {}
    // query['$and'] = [
    //     { '$or': matchQuery }
    // ]

    const query = { '$or': matchQuery }

    return Faq.find(query)
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
* @api {POST} /api/faqs Create
* @APIname Create
* @APIgroup Faq Controller
* @apidescription Creates a new Faq
* @apiSuccess {json} The newly created Faq
* @apiError (Error) 500 Internal server error
*/
module.exports.create = (req, res, next) => {
    return new Faq(req.body).save()
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

/**
* @api {GET} /api/faqs/:id Show
* @APIname Show
* @APIgroup Faq Controller
* @apidescription Fetch a single Faq
* @apiSuccess {json} The requested Faq
* @apiError (Error) 500 Internal server error
*/
module.exports.show = (req, res, next) => {
    return Faq.findById(req.params.id)
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
* @api {PUT} /api/faqs/:id Update
* @APIname Update
* @APIgroup Faq Controller
* @apidescription Update a single Faq
* @apiSuccess {json} The updated Faq
* @apiError (Error) 500 Internal server error
*/
module.exports.update = (req, res, next) => {
    return Faq.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

/**
* @api {DELETE} /api/faqs/:id Destroy
* @APIname Destroy
* @APIgroup Faq Controller
* @apidescription Destroy a single Faq
* @apiSuccess {json} The destroyed Faq
* @apiError (Error) 500 Internal server error
*/
module.exports.delete = (req, res, next) => {
    return Faq.remove({ _id: req.params.id })
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};
