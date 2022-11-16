// Importe le package Express 
const express = require('express');

// Créaction d'un router avec la méthode router d'Express 
const router = express.Router();

// Importer le Users Controllers
const usersController = require('../controllers/usersControllers');

const auth = require('../middleware/auth');

const User = require('../models/usersModels');


// Route POST création de compte utilisateur et connexion

// Inscription route 
router.post("/signup", usersController.signup);

// Connexion route
router.post("/login", usersController.login);

// Exporter la route
module.exports = router;