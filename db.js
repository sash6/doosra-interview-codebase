import mongoose from 'mongoose';

const  mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("DB connected succeddfully!");
});
