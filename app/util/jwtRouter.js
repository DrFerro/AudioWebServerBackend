const expressJwt = require('express-jwt');
const config = require('config.json');

module.exports = jwtRouter;

function jwtRouter() {
    const { secret } = config;
    return expressJwt({ secret }).unless({
        path: [
            // Public routes without authentication
            '/api/auth/authenticate',
            //Next route is authenticated by the controller            
            '/api/ear/song'
        ]
    });
}
