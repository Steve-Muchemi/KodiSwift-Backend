const axios = require('axios');

const sendMessageToWhatsApp = async (to, message) => {
  const apiKey = 'YOUR_WHATSAPP_API_KEY';
  const apiSecret = 'YOUR_WHATSAPP_API_SECRET';

  try {
    const response = await axios.post('https://api.whatsapp.com/send', {
      phone: to,
      text: message
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}:${apiSecret}`
      }
    });

    console.log('WhatsApp message sent successfully', response.data);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
};


io.on('connection', (socket) => {
    socket.on('sendMessageToWhatsApp', async ({ to, message }) => {
      await sendMessageToWhatsApp(to, message);
    });
  });

  
  const sendToWhatsApp = async (to, message) => {
    socket.emit('sendMessageToWhatsApp', { to, message });
  };
  