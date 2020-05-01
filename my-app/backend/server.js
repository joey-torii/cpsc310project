const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
// const bcrypt = require('bcrypt');


require('dotenv').config(); // environment variables are in the .env file

// creating the express server
const app = express();
const port = process.env.PORT || 5000;

// middle wear
app.use(cors());
app.use(express.json()); // allow us to parse json

// database uri, get from MongoDB dashboard
const uri = process.env.ATLAS_URI; // where the database is stored
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true}); // use everytime

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// require and then use the files
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Serve static assets in production
if(process.env.NODE_ENV == 'production'){
    // set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});