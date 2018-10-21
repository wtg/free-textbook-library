const router = require('express').Router();
const controller = require('./course.controller');

// // // //

// GET /courses
router.get('/', controller.list);

// GET /courses/search
router.get('/search', controller.search);

// POST /courses
router.post('/', controller.create);

// GET /courses/:id
router.get('/:id', controller.show);

// PUT /courses/:id
router.put('/:id', controller.update);

// DELETE /courses/:id
router.delete('/:id', controller.delete);

// GET /courses/:id/required_books
router.get('/:id/required_books', controller.showRequiredBooks);

// GET /courses/:id/recommended_books
router.get('/:id/recommended_books', controller.showRecommendedBooks);

// // // //

module.exports = router;
