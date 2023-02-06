const UserRepository = require("../repository/users.repository");

class UserService {
  userRepository = new UserRepository()
  //회원가입
  createUser = async(email, nickname, password, address, phoneNumber, type, grade) => {
    const createUserdata = await this.userRepository.createUser(
      email,
      nickname,
      password,
      address,
      phoneNumber,
      type,
    )
    return createUserdata
  }
  //로그인
  loginUser = async(email) => {
    const login = await this.userRepository.loginUser(email)

    return login
  }
}

module.exports = UserService;