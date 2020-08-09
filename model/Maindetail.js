const mongoose = require('mongoose')

let schema = mongoose.Schema

let studentdata = new schema({
     name : {
         type : String,
      required : true
     },
     email : {
        type : String,
     required : true
    },
    contact : {
        type : Number,
     required : true
    },
    address : {
        type : String,
     required : true
    }
})
let studentmodel = mongoose.model('srt',studentdata)
module.exports = studentmodel