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


axios.get('http://localhost:3001/api/message/chatHistory')
.then(response=>{
    console.log(response.data)

})
.catch(error=>{
    console.log(error);
})*/


// Assuming 'userid' is the identifier of the user you want to delete


/*

let users = [
    {
      socket: {
    
        _eventsCount: 8,
        _maxListeners: undefined,
       
      },
      userobj: {
        email: 'user40@gmail.com',
        username: 'user40',
        userid: '65b5a9332cdc37d38a77161',
        profilepic: 'undefined'
      }
    },
    {
        socket: {
      
          _eventsCount: 8,
          _maxListeners: undefined,
         
        },
        userobj: {
          email: 'user40@gmail.com',
          username: 'user40',
          userid: '65b5a9332cdc37d38a771e61',
          profilepic: 'undefined'
        }
      },
  ]

  const userIdToDelete = '65b5a9332cdc37d38a771e61';


  function del(){
users = users.filter(user => user.userobj.userid !== userIdToDelete);

console.log('Updated users:', users);
  }

  del();
  */
  const userId = ''


    const handleSubmit = async () => {
  
      try {
       
        await axios.post(`http://localhost:3002/api/property`, {
          userId: '65c00e7bd8fa3c03b2ca870b',
          name: 'newname',
          email: 'dude@gmail.com',
          phoneNumber: '123',
          profilePic: '',
          password: '',
        });
        console.log('Profile updated successfully');
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    };

    handleSubmit()