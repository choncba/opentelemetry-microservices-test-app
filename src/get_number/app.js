/*app.js*/
const express = require('express');
const logger = require("./logger");

// const PORT = parseInt(process.env.PORT || '8080');
const app = express();

app.use((req, res, next) =>{
  res.on('finish', () => {
    logger.info(`${req.method} ${req.url} ${req.protocol} -> ${res.statusCode} ${res.statusMessage}`);
  });
  next();
});

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

app.get('/rolldice', (req, res) => {
  var number1 = getRandomNumber(1,9).toString();
  var number2 = getRandomNumber(1,9).toString();
  res.status(200).send(`${number1}x${number2}`);
});

app.get('/', (req, res) => {
  res.status(200).send(getRandomNumber(0,1000).toString());
});

// URL para devolver un error
app.get("/error", (req, res, next) => {
  try{
    throw new Error('This is a test error');
  }catch(error){
    // logger.error("Server Error");
    res.status(500).send("Server Error");
  }
});

app.listen(80, () => {
  logger.info(`Listening for requests`);
});
