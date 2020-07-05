require('dotenv').config();
const express = require('express');
const morgan = require('morgan');


const app = express();
const port = process.env.PORT || 3000

// logging with morgan
app.use(morgan('combined'));

app.get('/', (req, res) => res.send('Hello world'));

app.listen(port, ()=> console.log(`Server running on http://localhost:${port}`))