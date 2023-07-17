const { NODE_ENV, JWT_SECRET, DEV_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    let payload;
    const token = authorization.replace('Bearer ', '');
    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET);
    } catch (err) {
      return next(new UnauthorizedError('Необходима авторизация'));
    }

    req.user = payload;
    return next();
  } return next(new UnauthorizedError('Необходима авторизация'));
};
