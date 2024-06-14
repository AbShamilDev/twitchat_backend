const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const wss = new WebSocket.Server({ server });

app.get("/", (req, res) => {
  res.send("WebSocket сервер работает!");
});

// Обработчик WebSocket соединений
wss.on("connection", (ws) => {
  console.log("Новое соединение установлено");

  ws.on("message", (message) => {
    console.log("Получено сообщение: %s", message);
    const parsedMessage = JSON.parse(message);
    switch (parsedMessage.type) {
      case "message":
        ws.send(parsedMessage.message);
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
