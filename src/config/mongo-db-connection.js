'use strict';
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true, useUnifiedTopology: true,
}).then(
    () => { console.log('Connected to the database') },
    err => { console.log('Some Error Occurred') }
);
