const app = require('./app.js');
const connectDB = require('./config/db');


    
    const port = process.env.port || 3001;

    //connect to our db before running the app
    connectDB().then(()=>{

   try { app.listen(port, ()=>{
       console.log( `APi is ready at http://localhost:/${port}`)
    })
    
    } catch(error){
    console.log("error ==>", error);
    process.exit(1);
    }
    })
