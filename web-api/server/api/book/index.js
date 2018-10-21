const router = require('express').Router();
const controller = require('./book.controller');

// // // //

// GET /books
router.get('/', controller.list);

// GET /books/search
router.get('/search', controller.search);

// POST /books
router.post('/', controller.create);

// GET /books/:id
router.get('/:id', controller.show);

// PUT /books/:id
router.put('/:id', controller.update);

// DELETE /books/:id
router.delete('/:id', controller.delete);

// GET /books/:id/book_type
router.get('/:id/book_type', controller.showBookType);

// GET /books/:id/checkouts
router.get('/:id/checkouts', controller.showCheckouts);

// // // //

module.exports = router;
