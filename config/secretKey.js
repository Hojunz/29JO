module.exports = {
  secretKey: "YoUrSeCrEtKeY",
  option: {
    algorithm: "HS256", // 해싱 알고리즘
    expiresIn: "30m", // 토큰 유효 기간
    issuer: "issuer", // 발행자
  },
}