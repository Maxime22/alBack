const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./configdb.js');
const Section = require('./models/section');

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

app.post('/alBack/section', (req, res, next) => {
    const sectionReq = req.body;
    delete sectionReq._id;
    let section = new Section(sectionReq); // sometimes {...sectionReq}, depends what is the req
    console.log(sectionReq)
    // console.log(...sectionReq)
    section.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
});

app.get('/alBack/section/:title', (req, res, next) => {
    Section.findOne({ title: req.params.title })
        .then(section => res.status(200).json(section))
        .catch(error => res.status(404).json({ error }));
});

app.use('/alBack/sections', (req, res, next) => {
    Section.find()
        .then(sections => res.status(200).json(sections))
        .catch(error => res.status(400).json({ error }));
});

// app.get('/alBack/sections', (req, res, next) => {
//     // _id are fake ids which i delete in the back before mongo create new real ids
//     const sections = [{
//         _id: 1,
//         title: "Mariage",
//         content: "coucou"
//     },
//     {
//         _id: 2,
//         title: "Portrait",
//         content: "yeah"
//     },
//     {
//         _id: 3,
//         title: "Couple",
//         content: "amazing"
//     },
//     {
//         _id: 2,
//         title: "Grossesse",
//         content: "bah"
//     }];
//     res.status(200).json(sections);
// });

// app.use((req, res, next) => {
//     console.log('Requête reçue !');
//     next();
// });

// app.use((req, res, next) => {
//     res.status(201);
//     next();
// });

// app.use((req, res, next) => {
//     res.json({ message: 'Votre requête a bien été reçue !' });
//     next();
// });

// app.use((req, res, next) => {
//     console.log('Réponse envoyée avec succès !');
// });

module.exports = app;