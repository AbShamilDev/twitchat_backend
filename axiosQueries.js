const axios = require("axios");

const send_message = async (message, targetClient) => {
  const result = await axios({
    method: "post",
    url: "https://b17d444024b5fb33.mokky.dev/messages",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      message: message.message,
      sender_id: +message.sender_id,
      recipient_id: +message.recipient_id,
      date: message.date,
      status: false,
    }),
  }).then((res) => res.data);

  if (targetClient) {
    targetClient.send(
      JSON.stringify({
        type: "get_message",
        message: {
          ...result.data,
        },
      })
    );
  }
};

module.exports = { send_message };
