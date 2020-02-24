module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction', {
      startDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      endDate: {
        type: DataTypes.DATE,
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
  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, {
      foreignKey: { name: 'user' }
    });
  };
  return Transaction;
};
