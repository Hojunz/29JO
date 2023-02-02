const AdminRepository = require('../repository/admin.repository')

class AdminService {
  adminRepository = new AdminRepository()
  //유저 목록
  findUser = async(req, res, next) => {
    const userList = await this.adminRepository.findUser()

    return userList
  }

}

module.exports = AdminService