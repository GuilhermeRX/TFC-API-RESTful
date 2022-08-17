import * as bcrypt from 'bcryptjs';

const passwordService = {
  encryptPassword: (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(password, salt);
    return encryptedPassword;
  },

  comparePassword: (password: string, hash: string) => {
    const check = bcrypt.compareSync(password, hash);
    return check;
  },
};

export default passwordService;
