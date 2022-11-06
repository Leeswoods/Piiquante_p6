// Importe le package Express 
const express = require('express');

// Notre application
// Permet de crée une application express 
const app = express();

// Connexion à MongoDB
// Importer le module de Mongoose
const mongoose = require('mongoose');
// Précision sur quelle base de données nous allons travailler
mongoose.connect('mongodb+srv://Leeswoods:Projet6_Openclassrooms@cluster0.vdgovhk.mongodb.net/?retryWrites=true&w=majority', 
    { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Exporter l'application / exporter la constante
// Permet d'y accéder depuis n'importe qu'elle fichier
module.exports = app;