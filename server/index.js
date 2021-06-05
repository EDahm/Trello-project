const express = require('express')
const app = express();
const path = require("path");


const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');




//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/list', require('./routes/lists'));



const mongoose = require('mongoose');
const { allowedNodeEnvironmentFlags } = require('process');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))





const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})