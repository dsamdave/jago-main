require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const connectDB = require("./config/db");

connectDB();


const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/about', (req, res) => res.render('about'));
app.get('/investment', (req, res) => res.render('investment'));
app.get('/faq', (req, res) => res.render('faq'));
app.get('/contact', (req, res) => res.render('contact'));

app.get('/deposit', requireAuth, (req, res) => res.render('deposit'));
app.get('/account', requireAuth, (req, res) => res.render('account'));
app.get('/payment', requireAuth, (req, res) => res.render('payment'));
app.get('/profile', requireAuth, (req, res) => res.render('profile'));
app.use(authRoutes);