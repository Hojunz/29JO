const MyPageService = require('../service/mypage.service')

class MyPageController {
  mypageService = new MyPageService()
  // 내 정보
  myInfo = async(req, res, next) => {
    try{
      const UserId = res.locals.user.id
      const myinfo = await this.mypageService.myInfo(UserId)

      res.status(200).json({data: myinfo})
    }catch(error) {
      console.log(error)
    } 
  }
}

module.exports = MyPageController;