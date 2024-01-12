const app = require('./app.js');

try {
    
    const port = process.env.port || 3000;
    app.listen(port, ()=>{
       console.log( `APi is ready at http://localhost:/${port}`)
    })
} catch(error){
    console.log("error ==>", error);
    process.exit(1);
}