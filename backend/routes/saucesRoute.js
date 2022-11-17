// Import d'Express et de sa méthode Router pour la création des routes
const express = require('express');
const router = express.Router();
// Import du middleware d'authentification pour sécuriser toutes les routes
const auth = require('../middleware/auth');
// Import du middleware Multer pour la gestion des fichiers dans les requêtes HTTP
const multer = require('../middleware/multer-config');

// Import des logiques métiers relatives aux différentes requêtes en lien avec les fiches sauce
const sauceCtrl = require('../controllers/saucesControllers');

// Routes
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
// router.post('/:id/like', auth, sauceCtrl.likeSauce);

// Export des routes 
module.exports = router;