const dbConnect = require('./db/mongodb')

async function insertData(){
    let result = await dbConnect()
    // let data = {
    //     performer:'nia Jackson',
    //     genre:'soul',
    //     day:10,
    //     price:100,
    //     image:'https://upload.wikimedia.org/wikipedia/en/1/1f/Nia_Jackson.png',
    // }
    // let response = await result.updateOne({day:10},{$set:data}) update data in db
    // let response = await result.insertOne(data) add data to db
    // let response = await result.insertMany(data) add multiple data to db make sure data inserted in array
        // let response = await result.deleteOne({day:10})
        // let response = await result.deleteMany({performer:'nia Jackson'})  //delete multiple same data  from db
    // console.log(response)
}
insertData()
