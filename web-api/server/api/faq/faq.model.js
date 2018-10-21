const mongoose = require('mongoose')

// // // //

const Faq = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique: false
  },
  answer: {
    type: String,
    required: true,
    unique: false
  },
  order: {
    type: Number,
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




// // // //

module.exports = mongoose.model('Faq', Faq)
