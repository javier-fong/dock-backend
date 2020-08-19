/* ------------------- Dependencies ------------------- */

const express = require('express');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const session = require("express-session");

const app = express();

/* ------------------- Middleware ------------------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
})