const mongoose = require('mongoose');


// let dataBaseInstance;
const dbUserName = 'naaneashwin';
const dbPassword = '9xfvu4SN3RD0KbEu';
const DB_NAME = 'StockGuardian';
const dbURI = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@stockguardian.4bwr6ir.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const localURI = 'mongodb://localhost:27017/StockGuardian';
mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
    console.log('Connected to Database', mongoose.connection.name);
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from Database');
});

mongoose.connection.on('error', (error) => {
    console.log(`Error occurred while connecting to DataBase: ${error}`);
    process.exit(1);
});