const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://babuhathua:1234567890@cluster0-kik5i.mongodb.net/Hritik?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("database successfully connected!")
}).catch((e)=>{
    console.log(e.message)
})
module.exports=mongoose