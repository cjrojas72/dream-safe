module.exports = function(sequelize, DataTypes) {

  const Posts = sequelize.define("Posts", {
    
    entry: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Posts.associate = function(models) {

    models.Posts.belongsTo(models.Account, {
      onDelete: 'CASCADE',
      validate: {
        allowNull: false
      }
    });

    models.Posts.belongsToMany(models.Categories, {
      through: {
        model: models.PostCategories
      }
    });
  }

  return Posts;
}