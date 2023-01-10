const express = require('express');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const _omit = require('lodash/omit');

const CollaborateurModel = require('./models/collaborateur');

// Création d'un nouveau Router express
const router = express.Router();

// Déclaration des routes
router.post('/', postLogin);

module.exports = router;

// ================================
// == Fonctions de routage ==
// ================================

function postLogin(req, res) {
  const user = CollaborateurModel.findByEmail(req.body.email);
  if (!user) return res.send(404, { error: 'Collaborateur introuvable' });

  bcrypt.compare(req.body.password, user.password).then((isValid) => {
    if (isValid) {
      // Générer le token utilisateur
      const token = jsonwebtoken.sign(
        user,
        process.env.APP_TOKEN_SECRET
      );

      // Envoi du token au client
      return res.send({ success: 'Succès de l\'authentification', token, user: _omit(user, ['password']) });
    } else {
      return res.send(403, { error: 'Erreur d\'authentification: Identifiants invalides.' });
    }
  });
}
