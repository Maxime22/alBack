const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./configdb.js');
const Section = require('./models/section');
const sectionRoutes = require('./routes/section');
const groupSectionRoutes = require('./routes/groupSection');
const photoRoutes = require('./routes/photo');

const app = express();

mongoose.connect('mongodb+srv://maxime:' + config.password + '@cluster0-j2mw2.mongodb.net/' + config.dbname + '?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/alBack/sections', sectionRoutes);
app.use('/alBack/groupSections', groupSectionRoutes);
app.use('/alBack/photos', photoRoutes);

app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
    next();
});

app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !');
});

module.exports = app;