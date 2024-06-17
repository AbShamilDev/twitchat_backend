const axios = require("axios");

const send_message = (message) => {
  return axios({
    method: "post",
    url: "https://b17d444024b5fb33.mokky.dev/messages",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      message: message.message,
      sender_id: message.sender,
      recipient_id: message.recipient,
      date: message.date,
      status: false,
    }),
  }).then((res) => res.data);
};

module.exports = { send_message };