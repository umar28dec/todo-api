const {body, check} = require('express-validator');

exports.registerValidator = [body('name')
    .trim()
    .exists()
    .withMessage('Name is required')
    .isLength({min: 3})
    .withMessage('Title must be at least 3 chars long'), body('email')
    .trim()
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email'), body('password')
    .trim()
    .exists()
    .withMessage('Password is required')
    .isLength({min: 8})
    .withMessage('Password must be at least 8 chars long')

];

exports.loginValidator = [body('email')
    .trim()
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email'), body('password')
    .trim()
    .exists()
    .withMessage('Password is required')
    .isLength({min: 8})
    .withMessage('Password must be at least 8 chars long')

];
