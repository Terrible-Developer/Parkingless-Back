export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '60s',
  },
  bcrypt: { saltRounds: process.env.SALT_ROUNDS || 10 },
});
