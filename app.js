require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const _ = require("lodash");
const nodemailer = require('nodemailer');
const winston = require('winston');
const app = express();
const port = 3000
const cors = require('cors');


app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

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


const jsonResponse = `{
  "response":"OK"
}`;


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {

    user: process.env.ONLINE_TRANSPORT_MAIL,
    pass: process.env.MAIL_PASS
  }
});

let mailOptions = {
  from: process.env.ONLINE_TRANSPORT_MAIL,
  to: process.env.TO_MAIL,
  subject: 'Email Subject',
  text: 'Hello, this is the body of the email 2.'
};

function task() {
  // Lógica de la tarea que deseas ejecutar cada 14 minutos
  console.log('Realizando tarea cada 14 minutos');
}

// Ejecuta la tarea inicialmente
task();

// Programa la ejecución de la tarea cada 14 minutos (14 * 60,000 milisegundos)
setInterval(task, 14 * 60 * 1000);



var users = [{
  name: 'tobi'
}, {
  name: 'loki'
}, {
  name: 'jane'
}];
app.get('/', (req, res) => {
  res.send("Hello");
})


app.post('/sendEmail', (req, res) => {
  console.log(req.body.text.inputName);
  mailOptions.subject = req.body.subject;
  mailOptions.text = JSON.stringify(req.body.text);
  mailOptions.html = `<html><head><style>table{border-collapse:collapse;}th,td{border:1pxsolidblack;padding:8px;}</style></head><body><h1>New Driver </h1><table><tr><th>Name</th><td>${req.body.text.inputName}</td></tr><tr><th>Address</th><td>${req.body.text.inputAdress}</td></tr><tr><th>Email</th><td>${req.body.text.inputEmail}</td></tr><tr><th>Phone</th><td>${req.body.text.inputPhone}</td></tr><tr><th>Experience</th><td>${req.body.text.inputExperience}</td></tr><tr><th>License</th><td>${req.body.text.inputLicense}</td></tr><tr><th>YOL</th><td>${req.body.text.inputYol}</td></tr><tr><th>CurrentCompany</th><td>${req.body.text.inputCurrentCompany}</td></tr><tr><th>Routes</th><td>${req.body.text.inputRoutes}</td></tr></table></body></html>`;
  console.log(process.env.ONLINE_TRANSPORT_MAIL);
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
  res.send(JSON.parse(jsonResponse));
})

app.post('/sendEmailContact', (req, res) => {
  mailOptions.subject = req.body.subject;
  mailOptions.text = JSON.stringify(req.body.text);
  mailOptions.html = `<html><head><style>table{border-collapse:collapse;}th,td{border:1pxsolidblack;padding:8px;}</style></head><body><h1>New Contact</h1><table><tr><th>Name</th><td>${req.body.text.inputName}</td></tr><tr><th>Company</th><td>${req.body.text.inputCompany}</td></tr><tr><th>Email</th><td>${req.body.text.inputEmail}</td></tr><tr><th>Phone</th><td>${req.body.text.inputPhone}</td></tr><tr><th>Message</th><td>${req.body.text.inputMessage}</td></tr></table></body></html>`;
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(error);
      console.log('Error occurred:', error);
    } else {
      logger.info(info.response);
      console.log('Email sent:', info.response);
    }
  });
  res.send(JSON.parse(jsonResponse));

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
