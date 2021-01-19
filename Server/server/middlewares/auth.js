const jwt = require('jsonwebtoken');
const app = require('../../app');

module.exports = {
  verifyUser: (req, res, next) => {
    // Let's request a token
    const token = req.body.token || req.query.token || req.headers['x-token'];

    // if token not found, what?
    if (!token) {
      return res.status(401).send({
        error: 'Unauthorised user'
      });
    }

    // Token verification
    jwt.verify(token, app.get('secret'), (err, decoded) => {
      if (err) {
        return res.status(403).send({
          error: 'Token could not be authenticated'
        });
      }
      req.decoded = decoded;
      next();
    });
  },

  // For admin routes
  verifyAdmin: (req, res, next) => {
    if (req.decoded && req.decoded.username === process.env.ADMIN_NAME) {
      return next();
    }
    return res.status(403).send({
      message: 'Solely for the admin'
    })
  },

  // VerifyToken 
  validateToken: (req, res, next) => {
    const athorizationHeader = req.headers.authorization;
    let result;
    if (authorizationHeader) {
      const token = req.headers.authorization.split(' ')[1]; // Bearer <Token>
    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      result = jwt.verify(token, process.env.JWT_SECRET);
      
      // Let's pass back the decoded token to the request object
      req.decoded = result;
      // We call next to pass execution to the subsequent middleware
      next();
    } catch (err) {
      // Throw an error just in case anything goes wrong with verification
      throw new Error(err);
    }
  } else {
    result = {
      error: `Authentication error. Token required.`,
      status: 401
    };
    res.status(401).send(result);
  }
}
};