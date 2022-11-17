// Importe le package Express 
const express = require('express');

// Créaction d'un router avec la méthode router d'Express 
const router = express.Router();

// Importer le middleware auth 
const auth = require('../middleware/auth');

// Importer le middleware multer pour les images
const multer = require('../middleware/multer-config');

// Importer le Sauces Controllers
const saucesController = require('../controllers/saucesControllers');


// Les Routes 

// Post ; créaction sauces
router.post("/", auth, multer, saucesController.createSauce);

// Get ; tableau de toutes les sauces
router.get("/", auth, saucesController.getAllSauces);

// Get ; Renvoie la sauce avec l’_id fourni
router.get("/:id", auth, saucesController.getOneSauce);

// Put ; modifier une sauce
// router.put("/:id", auth, multer, saucesController.modifySauce);

// // Delete ; supprime une sauce 
router.delete("/:id", auth, saucesController.deleteSauce);

// Post ; sauce like 
// router.post("/:id/like", auth, saucesController.likeSauce);


// Exporter la route
module.exports = router;