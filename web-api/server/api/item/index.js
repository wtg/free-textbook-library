const router = require('express').Router();
const controller = require('./item.controller');

// // // //

// GET /items
router.get('/', controller.list);

// GET /items/search
// router.get('/', controller.search);

// POST /items
router.post('/', controller.create);

// GET /items/:id
router.get('/:id', controller.show);

// PUT /items/:id
router.put('/:id', controller.update);

// DELETE /items/:id
router.delete('/:id', controller.delete);

// GET /items/:id/book
router.get('/:id/book', controller.showBook);

// GET /items/:id/checkouts
router.get('/:id/checkouts', controller.showCheckouts);

// // // //

module.exports = router;
