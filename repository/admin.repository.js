const { User } = require("../models");
const { Order } = require("../models");

class AdminRepository {
  //유저 목록
  findUser = async() => {
    const userList = await User.findAll({
      where: {type: 0}
    })
    return userList
  }
  //유저 id로 찾기
  findUserById = async(userId) => {
    const UserData = await User.findByPk(userId)
    return UserData
  }
  //유저 등급 변경
  ChangeUser = async(findUser) => {
    const ChangeUserData = await findUser.save()

    return ChangeUserData
  }
  //주문물건 불러오기
  getOrder = async() => {
    const OrderData = await Order.findAll({})

    return OrderData
  }
}

module.exports = AdminRepository