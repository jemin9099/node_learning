const mongooes = require('mongoose')
mongooes.connect('mongodb://localhost:27017/sampleDB')
const ProfileSchema = new mongooes.Schema({
            performer:String,
            genre:String,
            day:Number,
            price:Number,
            image:String
        })
// 
// const createData = async() => {
//     const Profile = mongooes.model('sample_Collection',ProfileSchema)
//     const data = new Profile({
//         performer:'nia Jackson',
//         genre:'Rocks',
//         day:'15',
//         price:1000,
//         expire:450,
//         image:'https://upload.wikimedia.org/wikipedia/en/1/1f/Nia_Jackson.png',
//     })
//     const result = await data.save()
//     console.log(result);    
// }

// const updateData = async() => {
//     let Profile = mongooes.model('sample_Collection',ProfileSchema)
//     let data = await Profile.updateOne({performer:'nia Jackson'},{$set:{price:100}})
// }

// const deleteData = async() => {
//     let Profile = mongooes.model('sample_Collection',ProfileSchema)
//     let data = await Profile.deleteOne({performer:'nia Jackson'})
// }

// const readData = async() => {
//     let Profile = mongooes.model('sample_Collection',ProfileSchema)
//     let data = await Profile.find()
//     console.log(data);
// }

// readData() for listing data 
// deleteData() for delete data
// updateData() for update data
// createData() for create data