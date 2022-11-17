// Importer le module de Mongoose
const mongoose = require('mongoose');

// Créaction de notre schhéma de donnée 
// Utilisation de la fonction Schema qui est mit à dispostion grâce au package mongoose
// On passe un objet à la fonction Schema qui va dicter les différents champs dont notre userSchema  aura besoin
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

module.exports = mongoose.model('Sauce', sauceSchema);