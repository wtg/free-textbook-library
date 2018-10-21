const mongoose = require('mongoose')

// // // //

const Checkout = new mongoose.Schema({
  start_date: {
    type: String,
    required: true,
    unique: false
  },
  end_date: {
    type: String,
    required: true,
    unique: false
  },
  status: {
    type: String,
    required: true,
    unique: false
  },
  check_out_librarian_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  check_in_librarian_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  renter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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
Checkout.virtual('check_out_librarian', {
  ref: 'User',
  localField: 'check_out_librarian_id',
  foreignField: '_id',
  justOne: true // Only return one User
});

// Specifying a virtual with a `ref` property is how you enable virtual population
Checkout.virtual('check_in_librarian', {
  ref: 'User',
  localField: 'check_in_librarian_id',
  foreignField: '_id',
  justOne: true // Only return one User
});

// Specifying a virtual with a `ref` property is how you enable virtual population
Checkout.virtual('renter', {
  ref: 'User',
  localField: 'renter_id',
  foreignField: '_id',
  justOne: true // Only return one User
});

// Specifying a virtual with a `ref` property is how you enable virtual population
Checkout.virtual('book', {
  ref: 'Book',
  localField: 'book_id',
  foreignField: '_id',
  justOne: true // Only return one Book
});


// Same as above just as a method
Checkout.methods.getCheckOutLibrarian = function () {
  return mongoose.model('User').findById(this.check_out_librarian_id);
}

// Same as above just as a method
Checkout.methods.getCheckInLibrarian = function () {
  return mongoose.model('User').findById(this.check_in_librarian_id);
}

// Same as above just as a method
Checkout.methods.getRenter = function () {
  return mongoose.model('User').findById(this.renter_id);
}

// Same as above just as a method
Checkout.methods.getBook = function () {
  return mongoose.model('Book').findById(this.book_id);
}


Checkout.set('toJSON', { getters: true, virtuals: true });

// // // //

module.exports = mongoose.model('Checkout', Checkout)
