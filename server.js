/* ------------------- Dependencies ------------------- */

const express = require('express');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const session = require("express-session");

const app = express();

/* ------------------- Imports ------------------- */

require('./db');

/* ------------------- Middleware ------------------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: 'http://localhost:8000',
        credentials: true,
        methods: 'GET, PUT, POST, DELETE'
    })
);
app.use(
    session({
        secret: "familydockapp",
        resave: true,
        saveUninitialized: true,
    })
);

/* ------------------- Route ------------------- */

const { GroceryRouter } = require('./routes');
app.use('/', GroceryRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
})