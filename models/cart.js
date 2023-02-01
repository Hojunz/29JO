const Sequelize = require("sequelize");

class Cart extends Sequelize.Model {
  static initiate(sequelize) {
    Cart.init(
      {
        quanitity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        isDone: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Cart",
        tableName: "Carts",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(models) {
    models.Cart.belongsTo(models.User, {
      foreignKey: "userId",
      targetKey: "id",
    });
    models.Cart.belongsTo(models.Goods, {
      foreignKey: "goodsId",
      targetKey: "id",
    });
    models.Cart.hasOne(models.Order_Cart, { foreignKey: "cartId" });
  }
}

module.exports = Cart;
