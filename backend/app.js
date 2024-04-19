const errorMiddleware = require('./middleware/error')

const express = require('express');
const app = express();
var cors = require('cors')
app.use(cors())

const cookieParser = require('cookie-parser');

app.use(express.json())
app.use(cookieParser())

// Route imports
const product = require('./routes/productRoute')
app.use("/api/v1", product)

const user = require('./routes/userRoute')
app.use("/api/v1", user)

const order = require('./routes/orderRoute')
app.use("/api/v1", order)
// Middleware for errors
app.use(errorMiddleware)


module.exports = app;