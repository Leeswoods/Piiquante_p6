// Importe le package Express 
const express = require('express');

// Créaction d'un router avec la méthode router d'Express 
const router = express.Router();

// Importer le middleware auth 
const auth = require('../middleware/auth');

// Importer le middleware multer pour les images
const multer = require('../middleware/multer-config');

// Importer le Sauces Controllers
const sauceCtrl = require('../controllers/saucesControllers');


// Les Routes 

// Post ; créaction sauces
router.post("/", auth, multer, sauceCtrl.createSauce);

// Get ; tableau de toutes les sauces
router.get("/", auth, sauceCtrl.getAllSauces);

// Get ; Renvoie la sauce avec l’_id fourni
router.get("/:id", auth, sauceCtrl.getOneSauce);

// Put ; modifier une sauce
router.put("/:id", auth, multer, sauceCtrl.modifySauce);

// // Delete ; supprime une sauce 
router.delete("/:id", auth, sauceCtrl.deleteSauce);

// Post ; sauce like 
router.post("/:id/like", auth, sauceCtrl.likeSauce);


// Exporter la route
module.exports = router;