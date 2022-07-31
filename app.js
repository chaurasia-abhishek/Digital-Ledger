const connectToMongo=require('./components/Database')
const express =require('express');
const cors = require('cors')

connectToMongo();

const app=express();
const port=4000;
app.use(cors())
app.use(express.json())

app.use(express.json())
app.get('/',(req,res)=>{res.send('hello')})
app.use('/api/auth',require('./components/routes/auth'))
app.use('/api/notes',require('./components/routes/notes'))
app.listen(port,()=>{
    console.log(`your application is hosting port @${port}`)
})