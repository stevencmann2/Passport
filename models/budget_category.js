module.exports = function (sequelize, DataTypes) {
    const BudgetCategory = sequelize.define("BudgetCategory", {

        categoryType: {
            type: DataTypes.STRING, // the type of category will be predefined using front end JS
            allowNull: false,
            validate: {
                len: [1, 100]
            }
        },

    });

    BudgetCategory.associate = function (models) {
        // We're saying that a Post should belong to an Author
        BudgetCategory.hasMany(models.BudgetBreakdown, {
         
        });
    }
    return BudgetCategory;
};





//   airfare: {
//     type: DataTypes.STRING,     //DataTypes.INTEGER
//     allowNull: false,
//     validate: {
//       len: [1, 100]
//     }
//   },
//   transportation: {
//     type: DataTypes.STRING,     //DataTypes.INTEGER
//     allowNull: false,
//     validate: {
//       len: [1, 100]
//     }
//   },
//   food: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       len: [1, 100]
//     }
//   },
//   lodging: {
//     type: DataTypes.STRING,     //DataTypes.DATEONLY
//     allowNull: false,
//     validate: {
//       len: [1, 100]
//     }
//   },
//   activities: {
//     type: DataTypes.STRING,     //DataTypes.DATEONLY
//     allowNull: false,
//     validate: {
//       len: [1, 100]
//     }
//   },
//   emergency: {
//     type: DataTypes.STRING,     //DataTypes.DATEONLY
//     allowNull: false,
//     validate: {
//       len: [1, 100]
//     }
//   },
//   other: {
//     type: DataTypes.STRING,     //DataTypes.DATEONLY
//     allowNull: false,
//     validate: {
//       len: [1, 100]
//     }
//   }