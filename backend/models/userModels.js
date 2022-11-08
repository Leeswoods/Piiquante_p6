// Importer le module de Mongoose
const mongoose = require('mongoose');

// Créaction de notre schhéma de donnée 
// Utilisation de la fonction Schema qui est mit à dispostion grâce au package mongoose
// On passe un objet à la fonction Schema qui va dicter les différents champs dont notre userSchema  aura besoin
const userSchema = mongoose.Schema({
    email : {type: String, required: true},
    password : {type: String, required: true},
})

// Exporter le model 
// 1er arguement à model : c'est le nom du model
// 2eme arguements à model : c'est le schéma qu'on veut utiliser 
module.exports = mongoose.model('User', userSchema);