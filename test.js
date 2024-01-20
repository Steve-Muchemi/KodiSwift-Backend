const axios = require('axios');

const data = {
    username: 'some_user',
    email: 'user2121@gmail.com',
password: 'anewpassword',
UserType: 'landlord',
}

axios.post('http://localhost:3001/api/user/register', data )
.then(response=>{
    console.log(response.data)
})
.catch(error=>{
    console.error(error.response.data.message)
})