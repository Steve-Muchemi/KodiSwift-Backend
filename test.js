const axios = require('axios');



axios.get('http://localhost:3000/')
.then(response=>{
    console.log(response.data.message)
})
.catch(error=>{
    console.error(error)
})