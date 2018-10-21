const router = require('express').Router();
const controller = require('./faq.controller');

// // // //

// GET /faqs
router.get('/', controller.list);

// GET /faqs/search
router.get('/search', controller.search);

// POST /faqs
router.post('/', controller.create);

// GET /faqs/:id
router.get('/:id', controller.show);

// PUT /faqs/:id
router.put('/:id', controller.update);

// DELETE /faqs/:id
router.delete('/:id', controller.delete);

// // // //

module.exports = router;
