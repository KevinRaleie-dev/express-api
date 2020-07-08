require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

try {
    mongoose.Promise = global.Promise;

    // set up a connection
    mongoose.connect(process.env.MONGO_DB_NAME, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(() => console.log('blog database connected ✍🏽'))
} catch (error) {
    console.error(`database connection error: ${error.message}`)
}



const app = express();
const port = process.env.PORT || 3000

// logging with morgan
app.use(morgan('combined'));

// middleware
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());

app.use(function (req, res){
    res.status(404).send({
        url: req.originalUrl + ' not found'
    })
})

app.get('/api/v1/', (req, res) =>
    res.sendFile(__dirname + '/static/index.html'));

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))