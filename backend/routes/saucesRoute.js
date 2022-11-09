// Importer le middleware auth 
const auth = require('../middleware/auth');

// Importe le package Express 
const express = require('express');

// Créaction d'un router avec la méthode router d'Express 
const router = express.Router();

// Importer le Sauces Controllers


// Importer le middleware multer pour les images
const multer = require('../middleware/multer-config');


// Les Routes 

// Get ; tableau de toutes les sauces


// Get ; Renvoie la sauce avec l’_id fourni


// Post ; créaction sauces


// Put ; modifier une sauce


// Delete ; supprime une sauce 


// Post ; sauce like 


// Exporter la route
module.exports = router;