const submitJoin = () => {
  const nickname = document.getElementsByName("nickname");
  const email = document.getElementsByName("email");
  const password = document.getElementsByName("password");
  const confirm_password = document.getElementsByName("confirm_password");
  const phonenumber = document.getElementsByName("phonenumber");
  const address = document.getElementsByName("address");

  if (!nickname[0].value) {
    alert("이름을 입력해 주세요");
    return;
  }

  if (
    !email[0].value ||
    !email[0].value.includes("@") ||
    !email[0].value.includes(".")
  ) {
    alert("이메일을 정확히 입력해 주세요");
    return;
  }
  if (password[0].value !== confirm_password[0].value) {
    alert("패스워드가 일치하지 않습니다.");
    return;
  }
  if (password[0].value.length < 4) {
    alert("비밀번호가 너무 짧습니다.");
    return;
  }
  if (
    !phonenumber[0].value ||
    phonenumber[0].value.length < 11 ||
    phonenumber[0].value.length > 11
  ) {
    alert("휴대폰 번호를 정확히 입력해 주세요");
    return;
  }
  if (!address[0].value) {
    alert("주소지를 입력해 주세요");
    return;
  }

  const data = {
    email: email[0].value,
    nickname: nickname[0].value,
    password: password[0].value,
    confirmPassword: confirm_password[0].value,
    address: address[0].value,
    phoneNumber: phonenumber[0].value,
    type: "0",
  };

  $.ajax({
    type: "POST",
    url: "/api/user/signup",
    data: data,
    success: function (response) {
      console.log(response.message);
      if (response.message === "회원가입 성공") {
        location.href = "/api/home";
      }
    },
  });
};
