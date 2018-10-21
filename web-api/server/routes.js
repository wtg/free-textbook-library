const router = require('express').Router()

// // // //

// Bootstrap API module routers
router.use('/auth', require('./api/auth'))
router.use('/users', require('./api/user'))
router.use('/book_types', require('./api/book_type'))
router.use('/books', require('./api/book'))
router.use('/checkouts', require('./api/checkout'))
router.use('/courses', require('./api/course'))

// // // //

module.exports = router
