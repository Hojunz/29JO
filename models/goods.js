const Sequelize = require("sequelize");

class Goods extends Sequelize.Model {
  static initiate(sequelize) {
    Goods.init(
      {
        name: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
        price: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        image: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        stock: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Goods",
        tableName: "Goods",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(models) {
    models.Goods.hasMany(models.Cart, {
      foreignKey: "goodsId",
      sourceKey: "id",
    });
  }
}

module.exports = Goods;
