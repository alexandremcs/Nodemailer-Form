const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/', (req, res) => {
    console.log(req.body)

    const transporter = nodemailer.createTransport({
      host: `${process.env.MAIL_HOST}`,
      service: `${process.env.MAIL_HOST}`,
      port: 465,
      secure: true,
      auth: {
          user: `${process.env.MAIL_USER}`,
          pass: `${process.env.MAIL_PASSWORD}`
      }
    });
  
  const mailOptions = {
    from: req.body.email,
    to: `${process.env.MAIL_USER}`,
    subject: `Cadastro de ${req.body.email}`,
    text: req.body.tel
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Ocorreu um erro ao enviar o email.');
    } else {
      console.log(`Email enviado: ${info.response}`);
      res.send('Email enviado com sucesso!');
    }
  });
});

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});