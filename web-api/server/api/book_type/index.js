const router = require('express').Router();
const controller = require('./book_type.controller');

// // // //

// GET /book_types
router.get('/', controller.list);

// GET /book_types/search
router.get('/search', controller.search);

// POST /book_types
router.post('/', controller.create);

// GET /book_types/:id
router.get('/:id', controller.show);

// PUT /book_types/:id
router.put('/:id', controller.update);

// DELETE /book_types/:id
router.delete('/:id', controller.delete);

// GET /book_types/:id/books
router.get('/:id/books', controller.showBooks);

// // // //

module.exports = router;
