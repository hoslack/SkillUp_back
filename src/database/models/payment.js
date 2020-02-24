module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    'Payment', {
      paymentType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }, {
      paranoid: true
    }
  );
  Payment.associate = (models) => {
    Payment.belongsTo(models.User, {
      foreignKey: { name: 'user' }
    });
  };
  return Payment;
};
