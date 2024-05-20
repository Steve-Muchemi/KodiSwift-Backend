/**
 * Handles the event when a user reads a particular message.
 * 
 * This function listens for 'We read your message' events emitted by a socket.
 * When a user reads a message, it updates the status of the message in the database
 * and notifies the sender that their message has been read.
 * 
 * @param {Object} socket - The socket object representing the current client connection.
 * @param {Array} dbMessages - An array containing previously sent messages.
 * @param {Object} DBMessages - The Mongoose model for message documents in the database.
 */
const handleReadMessage = (socket, dbMessages, DBMessages) => {
  socket.on('We read your message', async (readMessageObj) => {
      try {
          // Update the database to mark the message as read
          await DBMessages.updateOne({ messageid: readMessageObj.messageid }, { $set: { status: { received: true, read: true } } });
      } catch (error) {
          console.log('Error updating message status:', error);
      }

      // Notify the sender that their message was read
      const senderUser = users.find(user => user.userobj.userid === readMessageObj.sender);
      const senderSocket = senderUser.socket;
      const updatedMessage = { ...readMessageObj, status: { received: true, read: true } };
      senderSocket.emit('Your message was read', updatedMessage);
  });
};

module.exports = handleReadMessage;
