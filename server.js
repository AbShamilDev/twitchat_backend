const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const url = require("url");
const { send_message } = require("./axiosQueries");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const wss = new WebSocket.Server({ server });

app.get("/", (req, res) => {
  res.send("WebSocket сервер работает!");
});

const clients = new Map();

// Обработчик WebSocket соединений
wss.on("connection", (ws, req) => {
  console.log("Новое соединение установлено");
  const parameters = url.parse(req.url, true).query;
  const userId = parameters.userId;
  clients.set(+userId, ws);
  console.log("Подключение от пользователя под id:", userId);

  ws.on("message", (message) => {
    const parsedMessage = JSON.parse(message);

    console.log("Получено сообщение: %s", parsedMessage.message);

    switch (parsedMessage.type) {
      case "send_message":
        console.log(
          "от: %s к: %s",
          parsedMessage.sender_id,
          parsedMessage.recipient_id
        );

        send_message(
          parsedMessage,
          clients.get(+parsedMessage.recipient_id),
          clients.get(+parsedMessage.sender_id)
        );

        break;
      default:
        break;
    }
  });

  ws.on("close", () => {
    console.log("Соединение закрыто");
  });
});

// Запуск сервера
server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
