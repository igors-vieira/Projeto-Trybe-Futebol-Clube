import * as Joi from 'joi';

const message = 'All fields must be filled';
const loginSchema = Joi.object({
  email: Joi.string().required().messages({ 'string.empty': message,
    'any.required': message }),
  password: Joi.string().required().messages({ 'string.empty': message,
    'any.required': message }),
});

export default loginSchema;
