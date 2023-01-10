require('dotenv').config({ path: '.env.final' });
const path = require('node:path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const open = require('open');
const { readFileSync } = require('node:fs');

// INITIALISATION

const app = express();

// MIDDLEWARES

function getHome(req, res) {
  let file = readFileSync(path.join(__dirname, 'static', 'index.html'), 'utf8');
  file = file.replace('{APP_PORT}', process.env.APP_PORT);
  res.send(file);
}

app.get('/', getHome);
app.get('/index.html', getHome);

app.use('/', express.static(path.join(__dirname, 'static')));
app.use('/api', cors());
app.use('/api', express.json());
app.use('/api', morgan('dev'));

// ROUTEURS

const auth = require('./middlewares/auth');

app.use('/api/login', require('./login'));
app.use('/api/collaborateurs', auth, require('./router'));

// DÉMARRAGE DE L'APP
app.listen(process.env.APP_PORT, () => {
  const fullURL = `http://${process.env.APP_URL}${process.env.APP_PORT ? `:${process.env.APP_PORT}` : ''}`;

  console.log(`\nServeur d'API démarré sur : ${fullURL}`);
  console.log(`(Ctrl+C pour couper)\n`);
  open(fullURL);
});
