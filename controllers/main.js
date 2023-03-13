const jwt = require('jsonwebtoken');

const CustomApiError = require('../errors/custom-error');
const login = async(req, res, next) => {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
    if (!username || !password) {
        throw new CustomApiError('please provide username and password', 400)
    }
    const id = new Date().getDate();
    const token = jwt.sign({ id, username }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '30d' });

    res.status(200).json({ msg: 'user created', token });
}

const dashboard = async(req, res, next) => {
    console.log(req.headers);
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new CustomApiError('no token provided', 400);
    }
    let luckynumber = (Math.random() * 100);
    res.status(200).json({ msg: `hello syed`, secret: `here is your secret key ${luckynumber}` })
}

module.exports = {
    login,
    dashboard
}