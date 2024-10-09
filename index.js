// const http = require('http')
// http.createServer((req,res) =>{
    //     res.writeHead(200,{'Content-Type':'application\json'});
    //     res.write(JSON.stringify(data));
    //     res.end()
    // }).listen(5000)
    
const express = require('express');
const data = require('./data')
const app = express();
const port = 4200

app.get('/',(req,res) =>{
    console.log(req.query);
    let filterData = req.query.name ? data.filter(item => item.name === req.query.name) : data
    res.send(filterData)
})
app.get('/about',(req,res) =>{
    res.send('hello , this is a about page')
})
app.get('/help',(req,res) =>{
    res.send('Welcome , this is a help page')
})

app.listen(port)