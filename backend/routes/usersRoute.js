// Importe le package Express 
const express = require('express');

// Créaction d'un router avec la méthode router d'Express 
const router = express.Router();

// Importer le Users Controllers
const usersController = require('../controllers/usersControllers');

// Route POST création de compte utilisateur et connexion

// Inscription route 
router.post("/signup", usersController.signup);

// Connexion route
router.post("/login", usersController.login);

// Exporter le router 
module.exports = router;