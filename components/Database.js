const mongoose= require('mongoose');
const mongoURI='mongodb://localhost:27017/test' //enter mongod uri here

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log('we are connected with monogo')
    })
}

module.exports=connectToMongo;