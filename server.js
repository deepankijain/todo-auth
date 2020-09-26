require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

const app = express();

// Express parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to database');
});

//route set up
app.use('/users', require('./routes/userRoute'));
app.use('/todos', require('./routes/todoRoute'));

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
