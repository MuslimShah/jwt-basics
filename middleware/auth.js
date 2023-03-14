const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');
const authMiddleWare = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('no token provided');
    }
    //get token back
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`)
        const { id, username } = decoded;
        req.user = { id, username }
        next()
    } catch (error) {
        throw new UnauthenticatedError('not authorized to access this route');
    }
}
module.exports = authMiddleWare;