const axios = require('axios');

const data = {
    
    username: 'ruto william',
password: 'anewpassword',
UserType: 'landlord',
}

axios.post('http://localhost:3001/api/user/login', data )
.then(response=>{
    console.log(response.data)
})
.catch(error=>{
    console.error(error.response.data.message)
})