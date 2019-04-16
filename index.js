const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config()
const restapiRoutes = require('./controller');
const app = express()
const port = process.env.PORT;
const mongo_url = process.env.MONGO_URL;

mongoose.connect(
    mongo_url, 
    { useNewUrlParser:true }
  );

let db = mongoose.connection;
db.once('open', ()=> console.log('Connection to database is established'));

db.on('error', console.error.bind(console, "Database connection error"));

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

mongoose.set('useFindOneAndUpdate', false);

app.get('/', (req, res) => {
    return res.status(200).send("HELLO WORLD ON PORT " + port);

})

app.get('/items', restapiRoutes.getItem);
app.post('/items', restapiRoutes.addItem);

app.get('/items/:id', restapiRoutes.getSelectedItem);
app.post('/items/:id', restapiRoutes.updateItem);
app.post('/items/:id', restapiRoutes.deleteItem);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))