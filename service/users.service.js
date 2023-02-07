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
  //이메일로 패스워드 찾기
  findPw = async(email) => {
    const userPw = await this.userRepository.findPw(email)

    if(!userPw) {
      return {message: "존재하지 않는 이메일입니다."}
    }
    return userPw
  }
}

module.exports = UserService;