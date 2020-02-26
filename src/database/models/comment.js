
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    body: DataTypes.STRING
  }, { paranoid: true });
  Comment.associate = (models) => {
    Comment.belongsTo(models.Review, {
      foreignKey: 'reviewId',
      as: 'review'
    });
  };
  return Comment;
};
