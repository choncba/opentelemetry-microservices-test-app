/*app.js*/
const express = require('express');
const logger = require("./logger");

// const PORT = parseInt(process.env.FRONT_PORT || '8080');
const PORT = 4040;
const app = express();

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

app.get('/rolldice', (req, res) => {
  var number1 = getRandomNumber(1,9).toString();
  var number2 = getRandomNumber(1,9).toString();
  res.status(200).send(`${number1}x${number2}`);
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

app.listen(PORT, () => {
  logger.info(`Listening for requests on ${PORT}`);
});
