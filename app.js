const express = require('express');
const bodyParser = require("body-parser");
const _ = require("lodash");
const nodemailer = require('nodemailer');
const winston = require('winston');
const app = express();
const port = 3000
//onlinetransportweb@gmail.com
//OnTransport#909 pass gmail
//nodemailer qroxqbutlmbwicpw
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logfile.log'
    })
  ],
});



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'onlinetransportweb@gmail.com',
    pass: 'qroxqbutlmbwicpw'
  }
});

let mailOptions = {
  from: 'onlinetransportweb@gmail.com',
  to: 'reynaldogm95@gmail.com',
  subject: 'Email Subject',
  text: 'Hello, this is the body of the email 2.'
};


var users = [{
  name: 'tobi'
}, {
  name: 'loki'
}, {
  name: 'jane'
}];
app.get('/', (req, res) => {
  res.sendFile("Hello");
})


app.post('/sendEmail', (req, res) => {
  mailOptions.subject = req.body.subject;
  mailOptions.text = req.body.text;
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(error);
      console.log('Error occurred:', error);
    } else {
      logger.info(info.response);
      console.log('Email sent:', info.response);
    }
  });
  logger.info('info', req.body);
  console.log(req.body);
  res.send('thanks!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
