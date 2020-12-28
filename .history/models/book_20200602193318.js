const mongoose = require('mongoose')

let bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        
    }
})