require('dotenv').config()
const mongoose = require('mongoose')
const Promise = require('bluebird')
const CourseData = require('./seed/courses');
const Course = require('./course.model');

// // // //

// TODO - is this needed?
mongoose.Promise = global.Promise

// Connect to MongoDB

// Instantiates new Mongoose connection
const db = mongoose.connection

// Handles Mongoose connection error
db.on('error', console.error)

// Open Mongoose connection
db.once('open', () => {

  // logs connection status
  console.log('Connected to MongoDB...')

  // Pulls listing from CourseData obtained from yacs.io
  const listings = CourseData.terms[0]['listings']

  Promise.each(listings, (listing) => {
    return new Promise(async(resolve, reject) => {
      const course = new Course({
        label: listing.longname,
        subject_code: listing.course.subject.shortname,
        course_number: listing.course.shortname,
        required_book_isbns: listing.required_textbooks,
        recommended_book_isbns: listing.required_textbooks
      })

      await course.save()
      console.log('Saved ' + course.subject_code + course.course_number);

      // console.log(course);
      // console.log(listing);
      return resolve()
    })
  }).then(() => {
    console.log('DONE')
  })

})

mongoose.connect(process.env.MONGO_DB_URI)