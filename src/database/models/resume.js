
module.exports = (sequelize, DataTypes) => {
  const Resume = sequelize.define('Resume', {
    body: DataTypes.TEXT
  }, { paranoid: true });
  Resume.associate = (models) => {
    Resume.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };
  Resume.associate = (models) => {
    Resume.hasMany(models.Review, {
      foreignKey: 'resumeId',
      as: 'reviews'
    });
  };
  return Resume;
};
