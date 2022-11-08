// Importer le Users Models
const User = require('../models/usersModels');

// Importer le package bcrypt
const bcrypt = require('bcrypt');
const { error } = require('npmlog');
const { message } = require('statuses');

// Middleware 
// Fonction Signup pour l'enregistrement de nouveaux utilisateurs 

// Première chose qu'on fait, hacher le mdp grâce à la fonction bcrypt.hash() / méthode asynchrone
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User ({
            email: req.body.email,
            password: hash
        });
        // Enregistrement de la constante user dans la base de donnée 
        user.save()
        .then(() => res.status(201).json( {message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

// Middleware 
// Fonction Login pour la connexion des utilisateurs existants
exports.login = (req, res, next) => {

};