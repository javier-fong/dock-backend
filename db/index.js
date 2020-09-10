const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/' + 'dock';
// process.env.MONGODB_URI || 

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

mongoose.connection
.once('open', () => {
    console.log('Connected to Mongo: ' + MONGODB_URI);
}).on('error', err => {
    console.log(err + ' is Mongo not running?')
}).on('disconnected', err => {
    console.log(err + ' is Mongo disconnected?')
});