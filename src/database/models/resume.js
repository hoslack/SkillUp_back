module.exports = (sequelize, DataTypes) => {
  const Resume = sequelize.define(
    'Resume', {
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      paranoid: true
    }
  );
  Resume.associate = (models) => {
    Resume.belongsTo(models.User, {
      foreignKey: 'user'
    });
  };
  Resume.associate = (models) => {
    Resume.hasMany(models.Review, {
      foreignKey: 'reviews'
    });
  };
  return Resume;
};
