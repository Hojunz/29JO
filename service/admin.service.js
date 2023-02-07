const AdminRepository = require('../repository/admin.repository')

class AdminService {
  adminRepository = new AdminRepository()
  //유저 목록
  findUser = async(req, res, next) => {
    const userList = await this.adminRepository.findUser()

    return userList
  }
  //유저 등급 변경
  ChageUser = async(userId) => {
    try{
      const findUser = await this.adminRepository.findUserById(userId)

      if(!findUser) throw new Error("유저가 존재하지 않습니다.")

      if(findUser.grade === "신규회원") {
        findUser.grade = "일반회원"
        await this.adminRepository.ChangeUser(findUser)

        return {message: "등급이 변경되었습니다."}
      }
      if(findUser.grade === "일반회원") {
        findUser.grade = "우수회원"
        await this.adminRepository.ChangeUser(findUser)

        return {message: "등급이 변경되었습니다."}
      }
      if(findUser.grade === "우수회원") {
        findUser.grade = "VIP"
        await this.adminRepository.ChangeUser(findUser)

        return {message: "등급이 변경되었습니다."}
      }

      return {message: "상태변경이 더이상 불가능합니다."}
    } catch (err) {
      return { errormessage: "변경 오류" };
    }
  }
  // 주문물건 불러오기
  getOrder = async() => {
    const orderGoods = await this.adminRepository.getOrder()

    return orderGoods
  }
}

module.exports = AdminService