const mongoose = require('mongoose');

const db = "mongodb+srv://ajaybiradar362:Qwerty362@cluster0.5ebtloc.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(db)
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log("error in connecting to db", err);
    })