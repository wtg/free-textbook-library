const router = require('express').Router();
const controller = require('./checkout.controller');

// // // //

// GET /checkouts
router.get('/', controller.list);

// GET /checkouts/search
router.get('/search', controller.search);

// POST /checkouts
router.post('/', controller.create);

// GET /checkouts/:id
router.get('/:id', controller.show);

// PUT /checkouts/:id
router.put('/:id', controller.update);

// DELETE /checkouts/:id
router.delete('/:id', controller.delete);

// GET /checkouts/:id/check_out_librarian
router.get('/:id/check_out_librarian', controller.showCheckOutLibrarian);

// GET /checkouts/:id/check_in_librarian
router.get('/:id/check_in_librarian', controller.showCheckInLibrarian);

// GET /checkouts/:id/renter
router.get('/:id/renter', controller.showRenter);

// GET /checkouts/:id/book
router.get('/:id/book', controller.showBook);

// // // //

module.exports = router;
