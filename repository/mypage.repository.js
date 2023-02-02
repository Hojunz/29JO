const { User } = require("../models");

//내 정보
class MyPageRepository {
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
    console.log(mypage);
    return mypage
  }
}

module.exports = MyPageRepository;