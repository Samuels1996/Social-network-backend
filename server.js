const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const db = require('./config/connection');

const cwd = process.cwd();

const app = express();
const PORT = processs.env.PORT || 3001;

const activity = cwd.includes('01-Activities')
    ? cwd.split('/01-Activites/')[1]
    : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server live on ${PORT}`);
    });
});