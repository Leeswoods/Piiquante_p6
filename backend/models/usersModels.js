// Importer le module de Mongoose
const mongoose = require('mongoose');

// Importer Unique Validator
const uniqueValidator = require('mongoose-unique-validator');

// Créaction de notre schhéma de donnée 
// Utilisation de la fonction Schema qui est mit à dispostion grâce au package mongoose
// On passe un objet à la fonction Schema qui va dicter les différents champs dont notre userSchema  aura besoin
// la propriété unique indique à Mongoose que chaque document doit avoir une valeur unique pour un chemin donné
const userSchema = mongoose.Schema({
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true},
});

// Appliquer le plugin uniqueValidator au userSchema
userSchema.plugin(uniqueValidator);

// Exporter le model 
// 1er arguement à model : c'est le nom du model
// 2eme arguements à model : c'est le schéma qu'on veut utiliser 
module.exports = mongoose.model('User', userSchema);