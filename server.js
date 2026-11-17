// Mini-serveur web : envoie au navigateur les fichiers du dossier.
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

// Le navigateur a besoin de savoir quel type de fichier il reçoit.
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

const server = http.createServer((req, res) => {
  // "/" veut dire "la page d'accueil" : on envoie index.html.
  const name = req.url === "/" ? "index.html" : req.url;
  // path.basename ne garde que le nom du fichier (empêche d'aller lire ailleurs).
  const file = path.join(__dirname, path.basename(name));
  const type = TYPES[path.extname(file)];

  if (!type) {
    res.writeHead(404);
    return res.end("Introuvable");
  }

  fs.readFile(file, (err, content) => {
    if (err) {
      res.writeHead(404);
      return res.end("Introuvable");
    }
    res.writeHead(200, { "Content-Type": type });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Pong lancé : http://localhost:${PORT}`);
});
