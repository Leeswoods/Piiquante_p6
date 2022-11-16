// Importer le package bcrypt
const bcrypt = require('bcrypt');

// Importer package jsonwebtoken
const jwt = require('jsonwebtoken');

// Import du fichier .dotenv pour accéder aux variables d'environnement
const dotenv = require('dotenv');
dotenv.config();

// Importer le Users Models
const User = require('../models/usersModels');

// Middleware 
// Fonction Signup pour l'enregistrement de nouveaux utilisateurs 
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // Bcrypt hash le mot de passe saisi par l'utilisateur
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash // Injection du hash dans la base de données
            });
            user.save() // Sauvegarde du nouvel utilisateur
                .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
                .catch(() => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

// Logique métier pour la connexion d'un utilisateur
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            // Si l'utilisateur n'est pas dans notre base de donnée 
            if (!user) {
                // 401 : indique que vous devez être authentifié pour faire cette requête
                return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' })
            } else { // Cas de figure si l'utilisateur existe dans la base de données
                bcrypt.compare(req.body.password, user.password) // Bcrypt compare les deux passwords
                    .then(valid => {
                        // Cas de figure si le password n'est pas valide
                        if (!valid) {
                            // 401 : indique que vous devez être authentifié pour faire cette requête
                            return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' })
                        } else { // Si le password est valide, JWT crée un token d'authentification
                            res.status(200).json({
                                userId: user._id,
                                // Fonction sign de jsonwebtoken
                                token: jwt.sign(
                                    { userId: user._id },
                                    process.env.TOKEN,
                                    { expiresIn: '24h' }
                                )
                            });
                        }
                    })
                    .catch(error => res.status(500).json({error})); // Utilisateur introuvé
            }
        })
        .catch(error => res.status(500).json({error}));
};