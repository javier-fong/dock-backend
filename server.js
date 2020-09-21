/* ------------------- Dependencies ------------------- */

const express = require('express');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const session = require("express-session");
const passport = require("passport");
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
    origin: ['https://dock-frontend.herokuapp.com/', 'http://localhost:8000'],
    credentials: true,
    allowedHeaders: "*",
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

require('./config/passport-local-strategy')(passport);
app.use(passport.initialize());
app.use(passport.session());

/* ------------------- Route ------------------- */

const { AuthRouter, TodoRouter, PhotoJournalRouter, UserRouter, CalendarRouter } = require('./routes');
app.use('/', AuthRouter, TodoRouter, PhotoJournalRouter, UserRouter, CalendarRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`)
})