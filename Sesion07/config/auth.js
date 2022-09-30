const secret = require('./secret');
const { expressjwt } = require('express-jwt');

//Bearer <JWT>
function getTokenFromHeader(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == 'Bearer') {
        return req.headers.authorization.split(' ')[1]
    }
}

const auth = {
    required: expressjwt({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'user',
        getToken: getTokenFromHeader
    }),
}

module.exports = auth;
