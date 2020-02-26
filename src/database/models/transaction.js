
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    amount: DataTypes.INTEGER
  }, { paranoid: true });
  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };
  return Transaction;
};
