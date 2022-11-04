// CREACTION D'UN SERVEUR NODE 

// Node utilise le système de module CommonJS, donc pour importer le contenu d'un module JavaScript, on utilise le mot-clé require plutôt que le mot-clé import

// Importe le package HTTP de Node grâce à require
const http = require('http');

// Importe le package app grâce à require
const app = require('./app');

// Ajouter la normalisation de port
// Fonction qui renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne grâce à parseInt
const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
};

// la constante port écoute :
// Prend en compte les conditions de la fonction normalizePort
// soit la variable d'environnement du port grâce à process.env.PORT : si la plateforme de déploiement propose un port par défaut, c'est celui-ci qu'on écoutera ;
// soit le port 3000, ce qui nous servira dans le cas de notre plateforme de développement.
const port = normalizePort(process.env.PORT || '3000');

// On informe à l'application express dans qu'elle port elle va écouter
// l'appli écoute dans le port 3000
// Méthode .set
app.set('port', port);

// La gestion d'erreur
// la fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur ;
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    // Le server.address() est une interface de programmation d'application intégrée de la classe Socket dans le module tls qui est utilisée pour obtenir l'adresse liée du serveur.
    // cette méthode renvoie l'adresse liée contenant le nom de famille et le port du serveur.
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
        case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
        default:
        throw error;
    }
};


// Créaction du serveur 
// Reçois en arguments request et response
// Prend en paramètre une fonction qui sera appeler à chaque fois qu'on enverra une reuqête à notre serveur 
const server = http.createServer(app);

// Logging basique
// Un écouteur d'évènements est également enregistré, consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console.
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});


// le serveur écoute :
// soit la variable d'environnement du port grâce à process.env.PORT : si la plateforme de déploiement propose un port par défaut, c'est celui-ci qu'on écoutera ;
// soit le port 3000, ce qui nous servira dans le cas de notre plateforme de développement.
server.listen(process.env.PORT || 3000);