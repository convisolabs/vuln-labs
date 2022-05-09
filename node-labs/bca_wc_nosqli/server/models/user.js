const bcrypt = require('bcrypt');
const moongose = require('mongoose');
const Todos = require('./todo');

const UserSchema = new moongose.Schema({
  user_name: { type: String, require: true },
  user_email: { type: String, require: true, unique: true },
  user_password: { type: String, require: true },
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.hash(this.password, 9).then((hash) => {
    this.password = hash;
    next();
  }).catch(next);
});

UserSchema.pre('findOneAndDelete', async function (next) {
  const user_id = this.getQuery()._id;
  Address.deleteMany({ user_id })
    .then((_) => {
      User.findByIdAndDelete(user_id)
        .then(next)
        .catch(() => {
          throw new Error('Não foi possível deletar o usuário.');
        })
    })
    .catch(() => {
      throw new Error('Não foi possível deletar o todos do usuário');
    });
});

UserSchema.methods = {
  authenticate(password) {
    return bcrypt.compare(password, this.user_password).then((valid) => valid ? this : false);
  }
};

module.exports = moongose.model('User', UserSchema);