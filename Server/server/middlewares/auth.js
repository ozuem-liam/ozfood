const jwt = require('jsonwebtoken');
const User = require("../models").User;
const app = require('../../app');

module.exports = {
  verifyUser: (req, res, next) => {
    // Let's request a token
    const token = req.body.token || req.query.token || req.headers.authorization;

    // if token not found, what?
    if (!token) {
      return res.status(401).send({
        error: 'Unauthorised user'
      });
    }

    // Token verification
    jwt.verify(token, process.env.TOKEN_SECRET,  (err, decoded) => {
      if(err) {
        return res.status(403).send({
          error: 'Token could not be authenticated'
        });
      }
      req.decoded = decoded;
    });
    next();
  },
  
  // For admin routes
  verifyAdmin: async (req, res, next) => {
    const user = await User.findOne({
      where: {
        id: req.decoded.id
      }
    })
    if (req.decoded && user.dataValues.password == process.env.ADMIN_PASSWORD) {
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
      console.log(token);
    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      result = jwt.verify(token, process.env.JWT_SECRET);
      console.log(result);
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