const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route');
const mongoose = require('mongoose');
const app = express();

mongoose.set('strictQuery', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://Project-1:6H3EsS0qOKLtWR0B@cluster0.hln3nud.mongodb.net/internship-DB", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});