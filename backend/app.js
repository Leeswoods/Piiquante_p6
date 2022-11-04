// Importe le package Express 
const express = require('express');

// Notre application
// Permet de crée une application express 
const app = express();

// Middlware
// Va recevoir la requête, la réponse et la fcontion next
app.use ((req, res, next) => {
    console.log('Requête reçue !');
    next();
});

// Middlware
// Va recevoir la requête, la réponse et la fcontion next
app.use ((req, res, next) => {
    res.status(201);
    next();
});

// Réponse en format JSON
// Donne le moyen de répondre pour éviter une erreur 404
// Middlware
app.use ((req, res, next) => {
    res.json({message : 'Votre requête a bien été reçue !'});
    next();
});

// Middlware
// Va recevoir la requête, la réponse et la fcontion next
app.use ((req, res) => {
    console.log('Réponse envoyé avec succès');
});

// Exporter l'application / exporter la constante
// Permet d'y accéder depuis n'importe qu'elle fichier
module.exports = app;