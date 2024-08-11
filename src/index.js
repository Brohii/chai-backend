//require('dotenv').config({path: './env'});
import dotenv from 'dotenv';
import connectDB from './db/index.js';

dotenv.config({
    path: './env'
})


connectDB();
 

























/*

import express from 'expess'
const app = express()

;( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error 1",(error)=>{
            onsole.error("ERRORR 1",error)
        throw error
        })
        app.listen(process.env.PORT, ()=>{
          console.log(`App is listening on port : ${process.env.PORT}`)
        })

    }

    catch(error){
        console.error("ERRORR 2",error)
        throw error

    }

})()

*/