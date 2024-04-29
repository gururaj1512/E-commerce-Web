const errorMiddleware = require('./middleware/error')

const express = require('express');
const app = express();
var cors = require('cors')
app.use(cors())

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

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