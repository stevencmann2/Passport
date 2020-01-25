module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("user", {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 100]
        }
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 100]
        }
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 100]
        }
      }
    });
    User.associate = function(models) {
      // We're saying that a Post should belong to an Author
      User.hasOne(models.Trip, {
       
    });
  }
    return User;
  };
