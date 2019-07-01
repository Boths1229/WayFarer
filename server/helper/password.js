import bcrypt from 'bcrypt';

const hashPassword = password => bcrypt.hashSync(password, Number(process.env.SALT));

const decryptPassword = (userPass, hashedPass) => bcrypt.compareSync(userPass, hashedPass);

export default {
  hashPassword, decryptPassword
};
