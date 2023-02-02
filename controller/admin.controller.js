const AdminService = require('../service/admin.service')

class AdminController {
  adminService = new AdminService()
  //유저 목록
  findUser = async(req, res, next) => {
    try{
      const User = res.locals.user
      const userList = await this.adminService.findUser()

      if(User.type !== "1") {
        res.status(400).json({message: "권한이 없습니다."})
      }
      res.status(200).json({userList})
    }catch(error){
      res.status(400).json({ errorMessage: error.message });
    }
  }
}

module.exports = AdminController