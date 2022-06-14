const {body, check} = require('express-validator');
exports.bodyValidator = [body('title')
    .trim()
    .exists()
    .withMessage('Title is required')
    .isLength({min: 3})
    .withMessage('Title must be at least 3 chars long')
    .isAlphanumeric(['en-US'], {'ignore': ' _-'})
    .withMessage('Only alpha numeric allowed')
];

exports.idValidator = [check('todoId')
    .trim()
    .isMongoId().withMessage('Invalid todo Id.')

]
