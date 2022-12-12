const mongoose = require('mongoose')  // prepare Mongo database

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)
// The public interface of the module is defined by setting a value to the module.exports variable. We will set the value to be the Note model. The other things defined inside of the module, like the variables mongoose and url will not be accessible or visible to users of the module.