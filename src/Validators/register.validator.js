const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required().messages({
        'string.email': '{{#label}} must be a valid email'
    })
});

module.exports = {registerSchema};