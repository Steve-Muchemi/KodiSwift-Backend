const axios = require('axios');

//recieve code and check against code created
const codeGenerator = (req, res)=>{

    const { phoneNumber } = req.body;

const createCode= ()=>{
//create code
const code = 12345
return code
}

//send code
const sendCode= (phoneNumber)=>{

//send code to the recipient number
const headers = {
    Authorization: "Bearer EAAloiSnUr3ABOZByLKigHC23aXYUHIEWFy4nmBs10f32I8YIKRNZAMOZCoT8NrV6cCrGbqUWZCJCueKSkbZC4mBhk9LScfpeupNam0jGbeBUPZAcPlGE06MrHs6MagAfTIHADkSSDbqZCKfIZCZBUNZBjWtgnQKZCw8ldCYv9aleCUIjbI74FoR9W80ZBy3jif5jLP3JVgvEzYYfWYQBbSehupcZD",
    "Content-Type": "application/json"
  };


  const requestData = {
    messaging_product: "whatsapp",
    to: "254762381813",
    type: "template",
    template: {
      name: "hello_world",
      language: { code: "en_US" }
    }
  };
  
  axios.post('https://graph.facebook.com/v19.0/335601132958455/messages', requestData, { headers })
    .then(response => {
      console.log('Response:', response.data);
       
    })
    .catch(error => {
      console.error('Error:', error.response ? error.response.data : error.message);
    });
}

sendCode(phoneNumber)
}
module.exports = codeGenerator;