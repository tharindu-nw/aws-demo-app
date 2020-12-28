const mongoose = require('mongoose')

let bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['WR','CR','HR'],
        required: true
    }
}
)

let book = module.exports = mongoose.model('Book', bookSchema)