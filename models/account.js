module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define("Account", {
    // Giving the Author model a name of type STRING
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    fullName: {
      type: DataTypes.STRING
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    goal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    savings: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {len: [1]}
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Account.associate = function(models) {
    // Associating Account with Posts
    // When an Account is deleted, also delete any associated Posts
    Account.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return Account;
};
