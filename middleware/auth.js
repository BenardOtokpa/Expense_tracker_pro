const jsonwebtoken = require('jsonwebtoken')

const auth = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.replace('Bearer ', '');
    const jwt_payload = jsonwebtoken.verify(accessToken, process.env.jwt_key);

    req.user = jwt_payload;
  } catch (e) {
    res.status(401).json({
      status: 'Failed',
      message: 'Unauthorized!',
    })
    return
  }
  next()
}

module.exports = auth
