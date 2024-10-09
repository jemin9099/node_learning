const fs = require('fs')
const path = require('path')
const dirPath = path.join(__dirname,'files')
const filePath = `${dirPath}/dummy.txt`
// 1. Get argument from command line input  

    // const input = process.argv

    // if(input[2] === 'add'){
    //     fs.writeFileSync(input[3],input[4])
    // }
    // else if(input[2] === 'remove'){
    //     fs.unlinkSync(input[3])
    // }
    // else{
    //     console.log('invalid input')
    // }

// 2. Display file list from folder
    // const dirPath = path.join(__dirname,'files')

    //2.1 create multiple file one time 

        // for (i = 0; i < 5; i++){
        //     fs.writeFileSync(dirPath+'/dummy'+i+'.txt','this is a simple dummy text file')
        // }
    // 2.2 read all folder 

        // fs.readdir(dirPath,(err,files) => {
        //     files.forEach((file) => {
        //         console.log('file name is ' , file)
        //     })
        // })

// 3. CRUD with File System

    // 3.1 create file
        // fs.writeFileSync(filePath,'This is a dummy file')

    // 3.2 read file
        // fs.readFile(filePath,'utf8' , (err , file) => {
        //     if(!err) console.log(file)
        // })
    
    // 3.3 update file
        // fs.appendFile(filePath,' and this file name is dummy.text',(err) => {
        //      if(!err) console.log('this file is updated')
        // })

    // 3.4 rename file 
        // fs.rename(filePath,`${dirPath}/example.txt`,(err) => {
        //     if(!err) console.log('this file name is updated')
        // })
    
    // 3.5 delete file 
        // fs.unlinkSync(`${dirPath}/example.txt`)