import jwt from 'jsonwebtoken';

const decode = payload => jwt.decode(payload);

export {
  jwt,
  decode
};
