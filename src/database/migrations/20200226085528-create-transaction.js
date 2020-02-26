

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Transactions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    startDate: {
      type: Sequelize.DATE
    },
    endDate: {
      type: Sequelize.DATE
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Transactions')
};
