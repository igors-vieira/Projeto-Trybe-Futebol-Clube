import * as Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().required().messages({ 'string.empty': 'All fields must be filled' }),
  password: Joi.string().required().messages({ 'string.empty': 'All fields must be filled' }),
});

export default loginSchema;
