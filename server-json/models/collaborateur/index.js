const data = require('../../data/collaborateurs.json');

module.exports = {
  findRandom() {
    const random = data[Math.floor(Math.random() * data.length)];
    return random;
  },

  findAll() {
    return data;
  },

  findById(id) {
    const collaborateur = data.find((c) => c.id == id);
    if (!collaborateur) return null;
    return collaborateur;
  },

  findByEmail(email) {
    const collaborateur = data.find((c) => c.email == email);
    if (!collaborateur) return null;
    return collaborateur;
  },

  create(collaborateur) {
    const lastIndex = Math.max(...data.map((c) => c.id).map(Number)) + 1;
    collaborateur.id = lastIndex;
    data.push(collaborateur);
    return collaborateur;
  },

  update(collaborateur) {
    const index = data.findIndex((c) => c.id == collaborateur.id);
    if (index < 0) return null;
    data.splice(index, 1, collaborateur);
    return collaborateur;
  },

  delete(id) {
    const index = data.findIndex((c) => c.id == id);
    if (index < 0) return null;
    const collaborateur = { ...data[index] };
    data.splice(index, 1);
    return collaborateur;
  },
};
