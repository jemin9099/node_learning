const dbConnect = require('./db/mongodb')

const main = async () => {
    let result = await dbConnect()
    let data = await result.find().toArray()
    console.log(data)
}
main()