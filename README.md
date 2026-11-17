# Pong Online

Un jeu de Pong **1 contre 1 jouable en ligne**, dans le navigateur.

> Projet d'apprentissage : l'objectif est autant de comprendre ce qui est construit que de livrer le jeu.

## État d'avancement

- [x] Initialisation du dossier (`package.json`, dépôt Git)
- [x] Serveur Node.js local (mini-serveur de fichiers)
- [x] Pong local : raquettes, balle qui rebondit (sans score)
- [x] Score, mise en jeu après chaque point, victoire à 5, écran de fin, bouton Rejouer
- [x] La balle est servie vers le joueur qui vient de perdre le point
- [ ] Connexion temps réel entre deux joueurs
- [ ] Mise en ligne

## Stack prévue

À confirmer au fil du projet :

- **Node.js** pour le serveur
- **WebSocket** (ou Socket.IO) pour la communication temps réel
- **HTML + Canvas + JavaScript** pour le client

## Lancer le projet

```
npm start
```

Puis ouvrir http://localhost:3000 dans le navigateur.

Contrôles : **Z / S** (raquette gauche), **↑ / ↓** (raquette droite).

## Structure du dossier

```
pong-online/
├── index.html     # la page web (contient le canvas)
├── style.css      # l'apparence de la page
├── game.js        # la logique du jeu (balle, raquettes, boucle)
├── server.js      # mini-serveur Node.js qui envoie les fichiers au navigateur
├── package.json   # identité du projet et script npm start
├── README.md      # ce fichier
├── CLAUDE.md      # consignes de travail pour l'assistant
└── .gitignore     # fichiers que Git doit ignorer
```
