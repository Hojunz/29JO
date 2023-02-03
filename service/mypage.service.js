const MyPageRepository = require('../repository/mypage.repository')

class MyPageService {
  mypageRepository = new MyPageRepository()
  //내정보
  myInfo = async(UserId) => {
    const MyPage = await this.mypageRepository.myInfo(UserId)

    return MyPage 
  }
}

module.exports = MyPageService;