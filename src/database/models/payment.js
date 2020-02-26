
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    paymentType: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, { paranoid: true });
  Payment.associate = (models) => {
    Payment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };
  return Payment;
};
