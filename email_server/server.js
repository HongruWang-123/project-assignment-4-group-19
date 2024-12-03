const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;


app.use(cors());


app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
  }));


  app.post('/send-email', (req, res) => {
    const { email, items, total, address, payment } = req.body;
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'z2827971726@gmail.com',
        pass: 'gdce pmkc hyun xfye',
      },
    });
  
    const mailOptions = {
      from: 'your_email@gmail.com',
      to: email,
      subject: 'Order Confirmation',
      text: `
        Thank you for your order!
      `,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'There was an error sending the email. Please try again later.' });
      } else {
        console.log('Email sent:', info.response);
        return res.status(200).json({ message: 'Email sent successfully!' });
      }
    });
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
