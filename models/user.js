const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        nickname: {
          type: Sequelize.STRING(15),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        address: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: false,
        },
        phoneNumber: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: false,
        },
        grade: {
          type: Sequelize.STRING(30),
          allowNull: false,
          defaultValue: '신규회원',
        },
        type: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true, // createdAt, updatedAt
        underscored: false, // created_at, updated_at 으로 바뀜 (true면)
        modelName: "User",
        tableName: "users",
        paranoid: false, // deletedAt 유저 삭제일 // ture면 soft delete임
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(models) {
    models.User.hasMany(models.Cart, {
      foreignKey: "userId",
      sourceKey: "id",
    });
    models.User.hasMany(models.Order, {
      foreignKey: "userId",
      sourceKey: "id",
    });
  }

  // static associate(models) {
  //   models.User.hasMany(models.Laundry, {
  //     foreignKey: "user_id",
  //     sourceKey: "id",
  //   });
  //   models.User.hasMany(models.Review, {
  //     foreignKey: "user_id",
  //     sourceKey: "id",
  //   });
  // }
}

module.exports = User;