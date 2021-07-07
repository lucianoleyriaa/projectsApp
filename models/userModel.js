const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const bcrypt = require('bcryptjs');

const user = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Your must provide a name!'
      }
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: 'Your must provide an email!'
      },
      isEmail: {
        msg: 'Your must provide a valid email!'
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Your must provide a password!'
      }
    }
  },
  passwordConfirm: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'You must confirm your password!'
      },
      passwordAreEquals(value) {
        if((!this.password === value)) {
          throw new Error('Passwords are not the same!')
        }
      }
    }
  },
  passwordChangedAt: Sequelize.DATE,
  passwordResetToken: Sequelize.STRING,
  passwordResetTokenExpire: Sequelize.DATE,
  active: {
    type: Sequelize.STRING,
    defaultValue: true 
  }
},
{
  timestamps: false
})

user.addHook('beforeSave', async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 12);
    user.passwordChangedAt = Date.now();
  }
});

user.addHook('afterValidate', (user) => {
  if (user.changed('password')) {
    user.passwordConfirm = '';
  }
});

user.prototype.verifyData = async (enterPassword, userPassword) => {
  const isValid = await bcrypt.compare(enterPassword, userPassword);

  if (!isValid) return false;

  return true;
}

user.prototype.verifyPasswordDate = (user, JWTTimestamp) => {
  const date = new Date(JWTTimestamp);
  // console.log(user.passwordChangedAt);
  // console.log(date);
  // const now = new Date(Date.now());

  const userDate = parseInt((user.passwordChangedAt.getTime() / 1000),10)
  // console.log(JWTTimestamp);

  if (JWTTimestamp < userDate) {
    return false;
  }

  return true;
}

module.exports = user;