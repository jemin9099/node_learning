const express = require('express')
const multer = require('multer')
const app = express()
app.use(express.json())
const upload = multer({
    storage:multer.diskStorage({
        destination:(req,file,cb) =>{
            cb(null,'uploads')
        },
        filename:(req,file,cb) =>{
            cb(null,Date.now()+'-'+file.fieldname + '.jpg')
        }
    })
}).single('user_file')
app.post('/upload',upload,(req,res) =>{
    // console.log(req.file);
    res.send('req.file')
})
app.listen(5000)