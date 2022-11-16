// Import du fichier .dotenv pour accéder aux variables d'environnement
const dotenv = require('dotenv');
dotenv.config();

// Importe le package Express 
const express = require('express');

// Import du package Cors pour sécuriser les requêtes venant de serveurs différents
const cors = require('cors');

// Importer le module de Mongoose
const mongoose = require('mongoose');

// Notre application
// Permet de crée une application express 
const app = express();

// Importer path
// Le module Path permet de travailler avec des répertoires et des chemins de fichiers.
const path = require('path');

// Importer les routes
const userRoute = require('./routes/usersRoute');
const sauceRoute = require('./routes/saucesRoute')



// Connexion à MongoDB
// Précision sur quelle base de données nous allons travailler
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_NAME}.mongodb.net/?retryWrites=true&w=majority`, 
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Middleware qui permet d'intercepter toutes les requêtes qui ont comme Content-Type application/json et met à disposition leur body directement sur l'objet req 
app.use(express.json());
app.use(cors());
// Utiliser & Enregistrer les Routes  
app.use("/api/auth", userRoute);
app.use("/api/sauces", sauceRoute);
// définir le chemin où l'image sera stockée
app.use('/images', express.static(path.join(__dirname, 'images')))

// Exporter l'application / exporter la constante
// Permet d'y accéder depuis n'importe qu'elle fichier
module.exports = app;