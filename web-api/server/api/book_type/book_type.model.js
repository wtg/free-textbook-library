const mongoose = require('mongoose')

// // // //

const BookType = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: false
  },
  edition: {
    type: String,
    required: false,
    unique: false
  },
  isbn_13: {
    type: String,
    required: true,
    unique: true
  },
  isbn_10: {
    type: String,
    required: true,
    unique: true
  },
  authors: {
    type: [String],
    required: true,
    unique: false,
    default: []
  },
  list_price: {
    type: Number,
    required: true,
    unique: false
  },
  image_url: {
    type: String,
    required: true,
    unique: false
  },
  },
  // Collection options
  {
    timestamps: {
      createdAt: 'createdOn',
      updatedAt: 'updatedOn'
  },
  versionKey: false
});

// // // //


// Specifying a virtual with a `ref` property is how you enable virtual population
BookType.virtual('books', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'book_type_id' // TODO - this won't work with alias, needs reverse relation
  // justOne: true // Only return one Book
});



// // // //

module.exports = mongoose.model('BookType', BookType)
