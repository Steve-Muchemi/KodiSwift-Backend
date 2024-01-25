const axios = require('axios');

/*
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
*/

//logout
//const axios = require('axios');
/*
const token = 'xNzA1NzgxNjY0LCJleHAiOjE3MDU3ODUyNjR9.WewXwSGFPilh9-Nk5_6AQI8WEGLcp2pJXxg5i9qDOtY'

axios({
    method:'post', 
    url: 'http://localhost:3001/api/user/logout',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
.then(response => {
    console.log(response.data);
})
.catch(error => {

    console.error(error);
})


axios({
    method:'get', 
    url:'http://localhost:3001/api/message'

})
.then(response=>{
    console.log(response.data)

})
.catch(error=>{
    console.log(error);
})
*/

axios.get('http://localhost:3001/api/message/chatHistory')
.then(response=>{
    console.log(response.data)

})
.catch(error=>{
    console.log(error);
})
