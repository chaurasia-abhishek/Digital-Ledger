const jwt = require('jsonwebtoken');// to encrypt and validate a authentication session
const jwt_string = 'heisagoodb$oy';//digital signature key for session authentication


const fetchUserId = (req, res, next) => {
    //extracting auth-token from the header of the request
    const authToken = req.header('auth-token');
    if (!authToken) {
        return res.status(401).send({ error: 'please authenticate with a valid token' })
    }
    try {

        const data = jwt.verify(authToken, jwt_string);
        req.User = data.User;
        next();
    } catch (error) {
        res.status(401).send({ error: 'please authenticate with a valid token 2' })
    }
}

module.exports = fetchUserId