const errorMiddleware = require('./middleware/error')

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json())
app.use(cookieParser())

// Route imports
const product = require('./routes/productRoute')
app.use("/api/v1", product)

const user = require('./routes/userRoute')
app.use("/api/v1", user)
// Middleware for errors
app.use(errorMiddleware)


module.exports = app;