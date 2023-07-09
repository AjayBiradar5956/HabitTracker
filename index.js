const port = 8000;
const express = require('express');
const app = express();
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');


app.use(express.urlencoded());
app.use(express.static('assets'));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use('/', require('./routes/home'));

app.listen(port, function (err) {
    if (err) {
        console.log("Error connecting to server", err);
        return;
    }
    console.log("Connected to port", port);
})