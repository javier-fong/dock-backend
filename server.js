/* ------------------- Dependencies ------------------- */

const express = require('express');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const session = require("express-session");
require('dotenv').config();

const app = express();

/* ------------------- Imports ------------------- */

require('./db');

/* ------------------- Middleware ------------------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);
app.use(
    cors({
        origin: ['http://localhost:8000/', 'https://dock-frontend.herokuapp.com/'],
        credentials: true,
        // 'Access-Control-Allow-Origin' : 'http://localhost:8000',
        'Access-Control-Allow-Credentials': true,
        // 'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept',
        methods: 'GET, PUT, POST, DELETE'
    })
);
app.use(
    session({
      secret: "familydockapp",
      resave: false,
      saveUninitialized: true,
      cookie: {
        sameSite: 'none',
        secure: true
      }
    })
  );

/* ------------------- Route ------------------- */

const { AuthRouter, TodoRouter, PhotoJournalRouter, UserRouter } = require('./routes');
app.use('/', AuthRouter, TodoRouter, PhotoJournalRouter, UserRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
})