const Order = require('../models/orderModel');
const nodemailer = require('nodemailer');

exports.createOrder = async (req, res) => {
  try {
    const { userId, products, totalPrice, email } = req.body;

    const newOrder = new Order({
      userId,
      products,
      totalPrice,
      email,
    });

    const savedOrder = await newOrder.save();

    sendEmailNotification(email, savedOrder);

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};


const sendEmailNotification = async (email, order) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Order Confirmation',
      html: `
        <h1>Order Confirmation</h1>
        <p>Thank you for your purchase!</p>
        <p>Order ID: ${order._id}</p>
        <p>Total Price: $${order.totalPrice}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};
