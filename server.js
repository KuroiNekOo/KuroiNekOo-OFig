require('dotenv').config();

const express = require('express');
const compression = require('compression');
const session = require('express-session');

const router = require('./app/routes/router');

const app = express();

// Variables de configuration
const PORT = process.env.PORT || 5000;
const PASSPHRASE = process.env.SECRET || 'phrase';

app.set('view engine', 'ejs');
app.set('views', './app/views');

// Cookie valable 1 heure maximum
app.use(session({
  secret: PASSPHRASE,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: (1000 * 60 * 60),
  },
}));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

// Variable globale indiquant la note maximum d'une figurine
app.locals.noteMax = 5;

// Routeur principal
app.use(router);

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}/`);
});
