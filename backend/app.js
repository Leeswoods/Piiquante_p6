// Adresse MongoDB base de donnée
const dataBase = 'mongodb+srv://Leeswoods:Projet6_Openclassrooms@cluster0.vdgovhk.mongodb.net/?retryWrites=true&w=majority';

// Importe le package Express 
const express = require('express');

// Notre application
// Permet de crée une application express 
const app = express();

// Permettre à nos deux origines (localhost:3000 et localhost:4200) de communiquer 
// Pour cela, nous devons ajouter des headers à notre objet  response
// Pour utiliser le Middleware, on utilise la méthode .use / La méthode app.use() vous permet d'attribuer un middleware à une route spécifique de votre application.
// Ce Middleware sera appliquer  sur toutes les routes et toutes les requêtes envoyé à notre serveur 
// Ce Middleware permet à l'API d'accéder à l'application (localhost:4200)

// Premier setHeader, le "*" signifie tout le monde 
// Deuxième setHeader, on donne l'autorisation d'utiliser certains en-tête (headers) sur l'objet requête  
// Troisième setHeader, on donne l'autorisation d'utiliser certaines méthodes (verbe de requête) / envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
// Appeler next pour passer au middleware suivant
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  next();
});

// Pour gérer la requête POST venant de l'application front-end, on a besoin d'en extraire le corps JSON.
// Middleware qui permet d'intercepter toutes les requêtes qui ont comme Content-Type  application/json  et met à disposition leur  body  directement sur l'objet req 
// Utilisez ( express.json() ) pour analyser le corps de la requête.
app.use(express.json());

// Connexion à MongoDB
// Importer le module de Mongoose
const mongoose = require('mongoose');
// Précision sur quelle base de données nous allons travailler
mongoose.connect(dataBase, 
    { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Exporter l'application / exporter la constante
// Permet d'y accéder depuis n'importe qu'elle fichier
module.exports = app;