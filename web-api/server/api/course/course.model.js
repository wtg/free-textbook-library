const mongoose = require('mongoose')

// // // //

const Course = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    unique: false
  },
  subject_code: {
    type: String,
    required: true,
    unique: false
  },
  course_number: {
    type: Number,
    required: true,
    unique: false
  },
  required_book_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookType'
  }],
  recommended_book_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookType'
  }],
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


Course.methods.getRequiredBooks = function () {
  return mongoose.model('BookType').find({ _id: this.required_book_ids });
}
Course.methods.getRecommendedBooks = function () {
  return mongoose.model('BookType').find({ _id: this.recommended_book_ids });
}


// // // //

module.exports = mongoose.model('Course', Course)
