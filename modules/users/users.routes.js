const express = require('express');
const register = require('./controllers/register');
const login = require('./controllers/login');
const userDashboard = require('./controllers/userDashboard');

const userRoutes = express.Router();

// const register = require('./controllers/register')

//Routes..
userRoutes.post("/register", register)
userRoutes.post("/login", login)


userRoutes.get("/dashboard", userDashboard)


module.exports = userRoutes