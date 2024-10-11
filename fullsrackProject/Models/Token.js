const mongooes = require('mongoose')

const TokenSchema = new mongooes.Schema({
    userId:{
        type:String,
        required:true,
        ref:"User"
    },
    token:{
        type:String,
        required:true
    }
})
module.exports = mongooes.model('Token',TokenSchema) 