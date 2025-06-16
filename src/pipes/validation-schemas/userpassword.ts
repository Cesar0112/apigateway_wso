import * as Joi from 'joi';

export const UserPasswordSchema = Joi.object({
  user: Joi.string().required(),
  password: Joi.string().required(),
});
