import Joi from 'joi';

const newProductschema = Joi.object().keys({
  name: Joi.string().required().messages({
    'any.required': 'Name is a required field. Please provide a value for name.',
    'string.base': 'Name must be a string.',
    'string.empty': 'Name cannot be empty. Please provide a non-empty value for name.',
  }),
  description: Joi.string().required().messages({
    'any.required': 'description is a required field. Please provide a value for description.',
    'string.base': 'description must be a string.',
    'string.empty':
      'description cannot be empty. Please provide a non-empty value for description.',
  }),
  price: Joi.number().required().messages({
    'any.required': 'price is a required field. Please provide a value for price.',
    'number.base': 'price must be a number.',
    'number.empty': 'price cannot be empty. Please provide a non-empty value for price.',
  }),
});

export default newProductschema;
