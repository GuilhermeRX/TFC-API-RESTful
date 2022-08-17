import * as Joi from 'joi';
import ValidationError from '../erros/ValidationError';
import { ILogin } from '../services/UserService';

const validateUser = (user: ILogin): ILogin => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error, value } = schema.validate(user);

  if (error) throw new ValidationError(400, 'All fields must be filled');
  return value;
};
export default validateUser;
