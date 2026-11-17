# CLAUDE.md — Pong Online

## Projet

Pong Online : jeu 1 contre 1 jouable en ligne. Stack prévue : Node.js, WebSocket, HTML/Canvas.
Plateforme de développement : Windows (PowerShell). Langue de travail : **français**.

## Profil de l'utilisateur

**Niveau réel (à respecter)** :
- JavaScript : **0/10**. Node.js : **jamais utilisé** (installé et à jour).
- Ne confond plus Java et JavaScript : ce sont deux langages différents.
- Notions déjà vues : constantes, boucle de jeu, canvas, événements clavier, états du jeu (`game.phase`), rôle de `package.json` / `README.md` / `CLAUDE.md`.
- Notion **pas encore comprise** : les **paramètres de fonction** (et faire descendre une valeur d'une fonction à l'autre). Les réexpliquer avec un exemple simple avant de s'en servir.

**Conséquences pour mes réponses** :
- Définir chaque terme technique à sa **première apparition**, avec un exemple **hors du jeu** d'abord.
- Corriger honnêtement ses erreurs, sans les adoucir, mais avec bienveillance.
- Lui rappeler de sauvegarder (`Ctrl + S`) : il a déjà perdu des modifications faute de sauvegarde.

## Méthode de travail (obligatoire)

### Avant chaque modification
Expliquer le plan **en 3 points**, puis attendre ou enchaîner selon la demande.

### Après chaque modification
1. **Résumé** des fichiers modifiés ou créés.
2. **Concepts** expliqués simplement (le pourquoi, pas seulement le quoi).
3. **Un test** concret que l'utilisateur peut lancer pour vérifier.
4. **Un mini-exercice** à faire lui-même pour s'approprier la notion.

### Règles de cadrage
- Avancer **par petites étapes** : ne faire que ce qui est demandé, rien de plus.
- Ne pas créer le jeu ni ses fichiers tant que l'utilisateur ne l'a pas demandé.
- Ne pas faire de commit ni de push sans demande explicite.
- Rester concis : pas de survol de toutes les options, une recommandation argumentée.

## Où on en est

- Pong local terminé : raquettes (Z/S et flèches), balle, score, victoire à 5, écran de fin, bouton Rejouer.
- Service vers le perdant terminé et testé : paramètre `loserSide` passé de `scorePoint` → `startServe` → `resetBall` (écrit par Claude à la demande de l'utilisateur, qui n'avait pas compris les paramètres). Sans valeur (début de partie), le tirage reste aléatoire.
- **Étape suivante** : le mode en ligne (WebSocket). Les paramètres de fonction restent à consolider avec un exercice plus simple. Mettre à jour cette section à chaque étape.

## Conventions

- Ne jamais versionner `node_modules/` ni `.env` (voir `.gitignore`).
- Mettre à jour la section « État d'avancement » du `README.md` à chaque étape terminée.
