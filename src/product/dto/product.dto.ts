import * as Joi from 'joi';

export const ProductSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
  price: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).required(),
}).options({
  abortEarly: false,
});
