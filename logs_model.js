const mongoose = require('mongoose')

const Log = mongoose.model('logs', {
	title : { type: String, minLength: 3, required : true }, 
	state : { type: String, required: true },
})

module.exports = Log
