
// Query / Sort / Paginate
const buildQuery = (opts) => {

    // Defines return payload object
    let payload = {};

    // Defines Mongoose query
    query = opts.schema.find(opts.query || {});

    // Sort
    if (opts.sort) {
        query.sort(opts.sort);
    }

    // Pagination
    if (opts.paginate) {

        // Default pagination options
        let page = Number(opts.page) || 0;
        let per_page = Number(opts.per_page) || 10;
        let skip = per_page * page;

        // Applies pagination options to query
        query.limit(per_page);
        query.skip(skip);

        // Assigns pagination parameters to payload
        payload.page = page;
        payload.per_page = per_page;

    }

    // Assigns query to payload
    payload.query = query;

    // Returns payload
    return payload;

}

// // // //

// pagination middleware
// TODO - refactor and re-implement
module.exports.paginate = (schema, req, res, next) => {

    // Build paginated query
    let payload = buildQuery({
        schema:     schema,
        paginate:   true,
        page:       req.query.page,
        per_page:   req.query.per_page
    });

    // Returns paginated query
    return payload.query.lean().exec()
    .then( (response) => {

        // res.setHeader('Cache-Control', 'max-age=15')

        return res.status(200).send({
            page:       payload.page,
            per_page:   payload.per_page,
            items:      response })
        .end();

    })
    .catch(next);
};
