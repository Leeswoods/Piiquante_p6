// CREACTION D'UN SERVEUR NODE 

// Node utilise le système de module CommonJS, donc pour importer le contenu d'un module JavaScript, on utilise le mot-clé require plutôt que le mot-clé import

// Importe le package HTTP de Node grâce à require
const http = require('http');

// Importe le package app grâce à require
const app = require('./app');

// On informe à l'application express dans qu'elle port elle va écouter
// l'appli écoute :
// soit la variable d'environnement du port grâce à process.env.PORT : si la plateforme de déploiement propose un port par défaut, c'est celui-ci qu'on écoutera ;
// soit le port 3000, ce qui nous servira dans le cas de notre plateforme de développement.
// Méthode .set
app.set('port', process.env.PORT || 3000);

// Créaction du serveur 
// Reçois en arguments request et response
// Prend en paramètre une fonction qui sera appeler à chaque fois qu'on enverra une reuqête à notre serveur 
const server = http.createServer(app);

// le serveur écoute :
// soit la variable d'environnement du port grâce à process.env.PORT : si la plateforme de déploiement propose un port par défaut, c'est celui-ci qu'on écoutera ;
// soit le port 3000, ce qui nous servira dans le cas de notre plateforme de développement.
server.listen(process.env.PORT || 3000);