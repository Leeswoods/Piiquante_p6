// Importe le package Express 
const express = require('express');

// Notre application
// Permet de crée une application express 
const app = express();

// Réponse en format JSON
// Donne le moyen de répondre pour éviter une erreur 404
app.use ((req, res) => {
    res.json({message : 'Votre requête a bien été reçue !'})
})

// Exporter l'application / exporter la constante
// Permet d'y accéder depuis n'importe qu'elle fichier
module.exports = app;