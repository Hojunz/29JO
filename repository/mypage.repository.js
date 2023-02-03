const { User } = require("../models");


class MyPageRepository {
  //내 정보
  myInfo = async(UserId) => {
    const mypage = await User.findAll({
      attribute: [
        "email",
        "nickname",
        "address",
        "phoneNumber",
        "grade"
      ],
      where: {id: UserId}
    })
    return mypage
  }
}

module.exports = MyPageRepository;