const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    let responseData = {};
    let token = req.headers['x-access-token'];
    if (!token){
        responseData['status'] = 'failure';
        responseData['data'] = { auth: false, token: '' };
        responseData['message'] = 'No token provided.';
        return res.status(500).json(responseData);
    }

    jwt.verify(token, process.env.SECRET_JWT, function(err, decoded) {
        if (err){
            responseData['status'] = 'failure';
            responseData['data'] = { auth: false, token: '' };
            responseData['message'] = 'Failed to authenticate token.';
            return res.status(500).json(responseData);
        }
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;
