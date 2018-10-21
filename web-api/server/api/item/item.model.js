const mongoose = require('mongoose')

// // // //

const Item = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
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
Item.virtual('book', {
  ref: 'Book',
  localField: 'book_id',
  foreignField: '_id',
  justOne: true // Only return one Book
});


// Specifying a virtual with a `ref` property is how you enable virtual population
Item.virtual('checkouts', {
  ref: 'Checkout',
  localField: '_id',
  foreignField: 'item_id' // TODO - this won't work with alias, needs reverse relation
  // justOne: true // Only return one Checkout
});

// Same as above just as a method
Item.methods.getBook = function () {
  return mongoose.model('Book').findById(this.book_id);
}


Item.set('toJSON', { getters: true, virtuals: true });

// // // //

module.exports = mongoose.model('Item', Item)
