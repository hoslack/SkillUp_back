module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment', {
      body: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      paranoid: true
    }
  );
  Comment.associate = (models) => {
    Comment.belongsTo(models.Review, {
      foreignKey: { name: 'review' }
    });
  };
  return Comment;
};
