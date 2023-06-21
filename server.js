const fs = require('fs');
const express = require('express');
const app = express();
const env = require('dotenv').config({path: __dirname + '/.env'})

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))

require('./stratup/db')()
require('./stratup/errors')()

app.use(express.json()); 


app.get('/' , (req , res)=>{ res.send("Hi There .....")})

require('./routes')(app)
require('./middlewares/errors')(app)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Running on port: ${PORT}`))