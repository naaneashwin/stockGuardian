const dotenv = require('dotenv').config();
const express = require('express');
const  mongoose = require('mongoose');
const app = express();
const db = require('./src/Utilities/db');
const stocksRoutes = require('./src/Routers/stocksRoutes');
const userRoutes = require('./src/Routers/usersRoutes');
const { errorHandler } = require('./src/errorHandler');
const cookieParser = require('cookie-parser');

mongoose.connection.on('connected', listen);

const port = process.env.PORT || 3000;

function listen() {
    app.listen(port, () => {
        console.log(`Server listening @ Port ${port}`);
    })
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use((req, res, next) => {
    console.log('Befoe Call');
    next();
})
// add routes here
app.use('/stocks', stocksRoutes);
app.use('/users', userRoutes);
app.use((err,req, res, next) => {
    // console.log('Befoe error', err, res);
    next(err)
})
app.use(errorHandler);
app.use(() => console.log('Afte error'))