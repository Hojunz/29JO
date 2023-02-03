const Sequelize = require("sequelize");

class Order extends Sequelize.Model {
  static initiate(sequelize) {
    Order.init(
      {
        receiverName: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: false,
        },
        receiverAddress: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: false,
        },
        receiverPhone: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: false,
        },
        total_Price: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: false,
        },
        status: {
          type: Sequelize.STRING(30),
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Order",
        tableName: "Orders",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(models) {
    models.Order.belongsTo(models.User, {
      foreignKey: "userId",
      targetKey: "id",
    });
    models.Order.hasMany(models.Cart, {
      foreignKey: "orderId",
      sourceKey: "id",
    });
  }
}

module.exports = Order;
