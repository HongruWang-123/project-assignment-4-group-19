const Order = require('../models/checkoutModel');
const Product = require('../models/products');
const nodemailer = require('nodemailer');

exports.createOrder = async (req, res) => {
  try {
    console.log('Received order data:', req.body);

    const { userId, items, totalAmount, email } = req.body;

    if (!userId || !totalAmount || !items) {
      console.log('Missing required fields:', { userId, totalAmount, items });
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        received: { userId, totalAmount, items }
      });
    }

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      status: 'Pending'
    });

    console.log('Created order object:', newOrder);

    const session = await Order.startSession();
    session.startTransaction();

    try {
      for (const item of items) {
        const product = await Product.findById(item.productId);
        if (product) {
          product.stock -= item.quantity;
          await product.save({ session });
        }
      }


      const savedOrder = await newOrder.save({ session });
      await session.commitTransaction();
      session.endSession();

      console.log('Order saved successfully:', savedOrder);

      await sendEmailNotification(email, savedOrder);

      res.status(200).json({
        success: true,
        message: 'Order processed successfully',
        order: savedOrder
      });

    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error('Error during transaction:', error);
      res.status(500).json({
        success: false,
        message: 'Error processing order',
        error: error.message
      });
    }

  } catch (error) {
    console.error('Error in createOrder:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
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
