module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review', {
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      paranoid: true
    }
  );
  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: { name: 'user' }
    });
  };
  Review.associate = (models) => {
    Review.belongsTo(models.Resume, {
      foreignKey: { name: 'resume' }
    });
  };
  Review.associate = (models) => {
    Review.hasMany(models.Comment, {
      foreignKey: { name: 'comments' }
    });
  };
  return Review;
};
