const axios = require("axios");

const send_message = async (message, recipientClient, senderClient) => {
  const result = await axios({
    method: "post",
    url: "https://b17d444024b5fb33.mokky.dev/messages",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${message.token}`,
    },
    data: JSON.stringify({
      message: message.message,
      chatMembers: [{ id: message.sender_id }, { id: message.recipient_id }],
      date: message.date,
      status: false,
    }),
  }).then((res) => res.data);

  if (recipientClient) {
    recipientClient.send(
      JSON.stringify({
        type: "get_message",
        message: {
          ...result,
        },
      })
    );
  }
  if (senderClient) {
    senderClient.send(
      JSON.stringify({
        type: "get_message",
        message: {
          ...result,
        },
      })
    );
  }
};

module.exports = { send_message };
