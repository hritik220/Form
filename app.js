const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const mongoose = require('./model/register')
const mdata = require('./controller/main')

const app = express()
const server = http.createServer(app)

var port = process.env.PORT || 8000

app.set('view engine','ejs')
app.set('views','./views')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/abc',mdata)


app.use((req,res,next)=>{
    next(new createError(404,"found wrong page!"))
})

app.use((err,req,res,next)=>{
    const status = err.status || 500
    res.json({
        status: status,
        message : err.message
    })
})
server.listen(port,()=>{
    console.log(`listening on port ${port}`)
})
