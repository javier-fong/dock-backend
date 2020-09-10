/* ------------------- Dependencies ------------------- */

const express = require('express');
const PORT = process.env.PORT || 3000;
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
app.use(cors());

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