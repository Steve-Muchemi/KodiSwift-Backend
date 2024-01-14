const axios = require('axios');

const data = {
    username: 'some_user',
    email: 'user220@gmail.com',
password: 'anewpassword',
UserType: 'landlord',
}

axios.post('http://localhost:3001/api/user/login', data )
.then(response=>{
    console.log(response.data.message)
})
.catch(error=>{
    console.error(error)
})