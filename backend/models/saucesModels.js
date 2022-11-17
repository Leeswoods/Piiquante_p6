// Import du package Mongoose pour faire l'interface entre l'app et MongoDB
const mongoose = require('mongoose');

// Construction du schéma de données d'une fiche sauce
const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, min: 1, max: 10, required: true},
    likes: {type: Number, default: 0, required: true},
    dislikes: {type: Number, default: 0, required: true},
    usersLiked: {type: [String]},
    usersDisliked: {type: [String]}
});

// Export du schéma de données 
module.exports = mongoose.model('Sauce', sauceSchema);