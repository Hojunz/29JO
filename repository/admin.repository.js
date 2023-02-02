const { User } = require("../models");

class AdminRepository {
  //유저 목록
  findUser = async() => {
    const userList = await User.findAll({
      where: {type: 0}
    })
    return userList
  }
}

module.exports = AdminRepository