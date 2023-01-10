module.exports = function (req, res, next) {
  const { id } = req.params;

  if (id && req.user && (req.user.isAdmin === true || req.user.id == id)) {
    return next();
  }

  return res.send(403, { error: 'Accès refusé. Seuls le propriétaire ou les administrateurs peuvent accèder à cette ressource'});
}