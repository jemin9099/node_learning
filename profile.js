const mongooes = require('mongoose')

const profileSchema = new mongooes.Schema({
    performer:String,
    genre:String,
    day:Number,
    price:Number,
    image:String
})

module.exports = mongooes.model('sample_Collection',profileSchema)