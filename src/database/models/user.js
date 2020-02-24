module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User', {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true
      },
      profession: {
        type: DataTypes.STRING,
        allowNull: true
      },
      account: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      resume: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false
      },
      verificationCode: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      paranoid: true,
      defaultScope: {
        attributes: {
          exclude: ['password', 'verificationCode']
        }
      }
    }
  );
  User.associate = (models) => {
    User.belongsTo(models.Role, {
      foreignKey: { name: 'role' },
    });
  };
  User.associate = (models) => {
    User.hasMany(models.Review, {
      foreignKey: { name: 'reviews' }
    });
  };
  User.associate = (models) => {
    User.hasOne(models.Resume, {
      foreignKey: { name: 'resume' }
    });
  };
  User.associate = (models) => {
    User.hasMany(models.Payment, {
      foreignKey: { name: 'payments' }
    });
  };
  User.associate = (models) => {
    User.hasMany(models.Transaction, {
      foreignKey: { name: 'transactions' }
    });
  };
  return User;
};
