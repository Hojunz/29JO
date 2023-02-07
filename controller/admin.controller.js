const AdminService = require('../service/admin.service')

class AdminController {
  adminService = new AdminService()
  //유저 목록
  findUser = async(req, res, next) => {
    try{
      const userList = await this.adminService.findUser()

      res.status(200).json({userList})
    }catch(error){
      res.status(400).json({ errorMessage: error.message });
    }
  }
  //유저 상태 변경
  ChageUser =async(req,res,next) => {
    try {
      const {userId} = req.params

      const updata = await this.adminService.ChageUser(userId)

      if (updata.message) {
        return res.json({ message: updata.message });
      }

      res.status(200).send({ message: " 유저 상태 변경 완료 " });
    } catch (error) {
       res.status(400).json({ errorMessage: error.message });
    }
  }
  //주문물건 불러오기
  getOrder = async(req, res, next) => {
    try{
      const orderList = await this.adminService.getOrder()

      res.status(200).json({orderList})
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
   }
  }
}

module.exports = AdminController