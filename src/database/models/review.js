
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    description: DataTypes.TEXT
  }, { paranoid: true });
  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };
  Review.associate = (models) => {
    Review.belongsTo(models.Resume, {
      foreignKey: 'resumeId',
      as: 'resume'
    });
  };
  Review.associate = (models) => {
    Review.hasMany(models.Comment, {
      foreignKey: 'reviewId',
      as: 'comments'
    });
  };
  return Review;
};
