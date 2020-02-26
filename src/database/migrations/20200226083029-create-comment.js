

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Comments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    body: {
      type: Sequelize.STRING
    },
    reviewId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Reviews',
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Comments')
};
