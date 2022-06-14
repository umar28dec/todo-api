const User = require("../documents/user.document");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const {validationResult} = require("express-validator");


exports.registerUser = (req, res) => {
    let error = sendValidationMessage(req, res);
    if (error) {
        return false;
    }
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        name: req.body.name, email: req.body.email, password: hashedPassword
    }, function (err, user) {
        let responseData = {};
        if (err) {
            responseData['status'] = 'failure';
            responseData['data'] = {};
            responseData['message'] = 'There was a problem registering the user.';
            return res.status(500).json(responseData);
        }
        let token = jwt.sign({id: user._id}, process.env.SECRET_JWT, {
            expiresIn: process.env.TOKEN_EXPIRE_TIME
        });
        responseData['status'] = 'success';
        responseData['data'] = {auth: true, token: token};
        responseData['message'] = 'User registered successfully.';
        res.json(responseData);
    });
}

exports.login = (req, res) => {
    User.findOne({email: req.body.email}, function (err, user) {
        let error = sendValidationMessage(req, res);
        let responseData = {};
        if (error) {
            return false;
        }
        if (err) {
            responseData['status'] = 'failure';
            responseData['data'] = {};
            responseData['message'] = 'Some error occurred.';
            return res.status(500).json(responseData);
        }
        if (!user) {
            responseData['status'] = 'failure';
            responseData['data'] = {};
            responseData['message'] = 'No user found.';
            return res.status(404).json(responseData);
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({auth: false, token: null});

        let token = jwt.sign({id: user._id}, process.env.SECRET_JWT, {
            expiresIn: process.env.TOKEN_EXPIRE_TIME
        });

        responseData['status'] = 'success';
        responseData['data'] = {auth: true, token: token};
        responseData['message'] = 'User log-in successfully.';
        res.json(responseData);
    });
}
sendValidationMessage = (req, res) => {
    let errors = validationResult(req).mapped()
    if (!(Object.keys(errors).length === 0)) {
        let errorData = {
            status: 'failure', errors: errors, message: 'Todo validation failed'
        }
        return res.status(400).json(errorData);
    }
    return false;
}