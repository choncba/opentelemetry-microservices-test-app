/*app.js*/
const express = require('express');
const winston = require('winston');

// const PORT = parseInt(process.env.FRONT_PORT || '8080');
const PORT = 4040;
const app = express();

const logger = winston.createLogger({
  level: "http",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf((msg) => `${msg.timestamp} ${msg.level}: ${msg.message}`)
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

// app.use((req, res, next) => {
//   // logger.info(`Received a ${req.method} request for ${req.url}`);
//   logger.info(`${req.method} ${req.url} ${req.protocol} ${res.statusCode}`)
//   next();
// });

app.use((req, res, next) =>{
  res.on('finish', () => {
    logger.http(`${req.method} ${req.url} ${req.protocol} -> ${res.statusCode} ${res.statusMessage}`);
  });
  next();
});

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

app.get('/rolldice', (req, res) => {
  var number1 = getRandomNumber(1,9).toString();
  var number2 = getRandomNumber(1,9).toString();
  // logger.log("info", `Returned number: ${number}`);
  res.send(`${number1}x${number2}`);
});

// URL para devolver un error
app.get("/error", (req, res, next) => {
  // throw new Error('This is a test error');
  res.status(500).send("Server Error");
});

// Manejo del error
// app.use((err, req, res, next) => {
//   // logger.error(err.message);
//   res.status(500).send();
// });

app.listen(PORT, () => {
  logger.log("info", `Listening for requests on ${PORT}`);
});
