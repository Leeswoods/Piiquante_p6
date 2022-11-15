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
    heat: {type: String, required: true},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    usersLikes: {type: [String]},
    usersDisliked: {type: [String]},
})

module.exports = mongoose.model('Sauce', sauceSchema);