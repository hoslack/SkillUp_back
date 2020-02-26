
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Payments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    paymentType: {
      type: Sequelize.STRING
    },
    balance: {
      type: Sequelize.INTEGER
    },
    amount: {
      type: Sequelize.INTEGER
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        onDelete: 'CASCADE',
        key: 'id'
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Payments')
};
