module.exports = function(sequelize, DataTypes) {
    const Trip = sequelize.define("trip", {
      trip_name: {
        type: DataTypes.STRING,     //DataTypes.INTEGER
        allowNull: false,
        validate: {
          len: [1, 100]
        }
      },
      total_budget: {
        type: DataTypes.INTEGER,     //DataTypes.INTEGER
        allowNull: false,
        validate: {
          len: [1, 100]
        }
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 100]
        }
      },
      departing: {
        type: DataTypes.STRING,     //DataTypes.DATEONLY
        allowNull: false,
        validate: {
          len: [1, 100]
        }
      },
      returning: {
        type: DataTypes.STRING,     //DataTypes.DATEONLY
        allowNull: false,
        validate: {
          len: [1, 100]
        }
      },
      user_ID: {
        type: DataTypes.STRING,     //DataTypes.DATEONLY
        allowNull: false,
        validate: {
          len: [1, 100]
        }
      },
      trip_ID: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,100]
        }

      }
    });
    
    return Trip;
  }

    
 
  