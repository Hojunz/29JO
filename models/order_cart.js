const Sequelize = require("sequelize");

class Order_Cart extends Sequelize.Model {
  static initiate(sequelize) {
    Order_Cart.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Order_Cart",
        tableName: "Order_Carts",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(models) {
    models.Order_Cart.belongsTo(models.Order, {
      foreignKey: "orderId",
      targetKey: "id",
    });
  }
}

module.exports = Order_Cart
