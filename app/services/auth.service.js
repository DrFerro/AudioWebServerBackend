const shajs = require('sha.js');

const config = require('config.json');
const jwt = require('jsonwebtoken');

module.exports = { authenticate };

    // User name: AudioUser
    // Password: pass

async function authenticate({ username, password }) {

    var hash = shajs('sha256').update(password).digest('hex');
    password = hash;
    hash = shajs('sha256').update(username).digest('hex');
    username = hash;

    if (username == config.user.username && password == config.user.password) {
        const token = jwt.sign({ sub: config.user.id }, config.secret);
        const { password, ...userWithoutPassword } = config.user;
        return { userWithoutPassword, token };
    }
}
