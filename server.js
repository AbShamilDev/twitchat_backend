const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const url = require("url");
const { type } = require("os");

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
    console.log("Получено сообщение: %s", message);
    const parsedMessage = JSON.parse(message);
    switch (parsedMessage.type) {
      case "message":
        const targetClient = clients.get(+parsedMessage.reciver);
        console.log(targetClient, parsedMessage.reciver);
        if (targetClient) {
          targetClient.send(
            JSON.stringify({
              type: "message",
              content: parsedMessage.message,
              from: parsedMessage.sender,
            })
          );
        }
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
