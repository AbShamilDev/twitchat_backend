const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get("/", (req, res) => {
  res.send("WebSocket сервер работает!");
});

// Обработчик WebSocket соединений
wss.on("connection", (ws) => {
  console.log("Новое соединение установлено");

  ws.on("message", (message) => {
    console.log("Получено сообщение: %s", message);
    // Отправка сообщения обратно клиенту
    ws.send(`Эхо: ${message}`);
  });

  ws.on("close", () => {
    console.log("Соединение закрыто");
  });
});

// Запуск сервера
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);

  console.log(`IP-адрес сервера: ${server.address().address}`);
});
