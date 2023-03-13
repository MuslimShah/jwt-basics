const CustomApiError = require('../errors/custom-error');
const login = async(req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new CustomApiError('please provide username and password', 400)
    }

    res.send('fake login route');
}

const dashboard = async(req, res, next) => {
    let luckynumber = (Math.random() * 100);
    res.status(200).json({ msg: `hello syed`, secret: `here is your secret key ${luckynumber}` })
}

module.exports = {
    login,
    dashboard
}