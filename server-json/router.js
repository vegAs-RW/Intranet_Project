const express = require('express');
const bcrypt = require('bcrypt');
const _omit = require('lodash/omit');

const CollaborateurModel = require('./models/collaborateur');
const validateCollaborateur = require('./models/collaborateur/schema');

const adminOnly = require('./middlewares/adminOnly');
const ownerOnly = require('./middlewares/ownerOnly');

// Création d'un nouveau Router express
const router = express.Router();

// Déclaration des routes
router.get('/random', getRandomCollaborateur);
router.get('/', getCollaborateurs);
router.get('/:id', getCollaborateur);
// // Routes disponibles uniquement pour les admins
router.post('/', adminOnly, addCollaborateur);
router.put('/:id', ownerOnly, updateCollaborateur);
router.delete('/:id', adminOnly, deleteCollaborateur);

module.exports = router;

// ================================
// == Fonctions de routage ==
// ================================

function getRandomCollaborateur(_, res) {
  const collaborateur = CollaborateurModel.findRandom();

  res.send(_omit(collaborateur, ['password', 'isAdmin']));
}

function getCollaborateurs(_, res) {
  const collaborateurs = CollaborateurModel.findAll();

  res.send(collaborateurs.map((c) => _omit(c, ['password', 'isAdmin'])));
}

function getCollaborateur(req, res) {
  const { id } = req.params;
  const collaborateur = CollaborateurModel.findById(id);

  if (!collaborateur)
    return res.status(404).send({ error: 'Collaborateur introuvable' });

  res.send(_omit(collaborateur, ['password', 'isAdmin']));
}

function addCollaborateur(req, res) {
  const newUser = { ...req.body };
  
  if (!req.body.password) {
    return res.status(400).send({ error: 'Missing field password' });
  }
  
  Promise.resolve(newUser)
    .then((newUser) => {
      validateCollaborateur(newUser);
      return newUser;
    })
    .then(() => bcrypt.hash(req.body.password, 10))
    .then((passwordHashed) => {
      console.log('newUser hashed', newUser)
      newUser.password = passwordHashed;
      return newUser;
    })
    .then((newUser) => {
      CollaborateurModel.create(newUser);
      return newUser;
    })
    .then((newUser) => {
      res.status(201).send({
        success: 'Collaborateur ajouté',
        collaborateur: _omit(newUser, ['password']),
      });
    })
    .catch((errors) => res.status(400).send(errors));
}

function updateCollaborateur(req, res) {
  const { id } = req.params;
  const collaborateur = CollaborateurModel.findById(id);

  if (!collaborateur)
    return res.status(404).send({ error: 'Collaborateur introuvable' });

  const userModified = { ...req.body, id, password: collaborateur.password };

  Promise.resolve(userModified)
    .then((userModified) => {
      if (req.body.password) {
        return bcrypt.hash(req.body.password, 10).then((passwordHashed) => {
          userModified.password = passwordHashed;
          return userModified;
        });
      }

      return userModified;
    })
    .then((userModified) => {
      validateCollaborateur(userModified);
      return CollaborateurModel.update(userModified);
    })
    .then((userModified) => {
      res.status(201).send({
        success: 'Collaborateur modifié',
        collaborateur: _omit(userModified, ['password']),
      });
    })
    .catch((errors) => res.status(400).send(errors));
}

function deleteCollaborateur(req, res) {
  const { id } = req.params;

  if (id === req.user.id) {
    return res.status(400).send({ error: 'Vous ne pouvez pas vous supprimer vous-même 😑' });
  }

  const deletedUser = CollaborateurModel.delete(id);

  if (!deletedUser)
    return res.status(404).send({ error: 'Collaborateur introuvable' });

  res.send({
    success: 'Collaborateur supprimé',
    collaborateur: _omit(deletedUser, ['password']),
  });
}
