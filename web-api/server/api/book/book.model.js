const mongoose = require('mongoose')

// // // //

const Book = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    required: false,
    unique: false
  },
  book_type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookType'
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
Book.virtual('book_type', {
  ref: 'BookType',
  localField: 'book_type_id',
  foreignField: '_id',
  justOne: true // Only return one BookType
});


// Specifying a virtual with a `ref` property is how you enable virtual population
Book.virtual('checkouts', {
  ref: 'Checkout',
  localField: '_id',
  foreignField: 'book_id' // TODO - this won't work with alias, needs reverse relation
  // justOne: true // Only return one Checkout
});

// Same as above just as a method
Book.methods.getBookType = function () {
  return mongoose.model('BookType').findById(this.book_type_id);
}


Book.set('toJSON', { getters: true, virtuals: true });

// // // //

module.exports = mongoose.model('Book', Book)
