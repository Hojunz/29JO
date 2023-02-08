const body = document.querySelector("body");
const modal = document.querySelector(".modal");
const modalButton = document.querySelector(".modal-button");
const closeButton = document.querySelector(".close-button");
const scrollDown = document.querySelector(".scroll-down");
let isOpened = false;
const openModal = () => {
  modal.classList.add("is-open");
  body.style.overflow = "hidden";
};
const closeModal = () => {
  modal.classList.remove("is-open");
  body.style.overflow = "initial";
};
window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight / 3 && !isOpened) {
    isOpened = true;
    scrollDown.style.display = "none";
    openModal();
  }
});
modalButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
document.onkeydown = (evt) => {
  evt = evt || window.event;
  evt.keyCode === 27 ? closeModal() : false;
};

const Login = () => {
  console.log("1");
  const email = document.getElementsByName("email");
  const password = document.getElementsByName("password");
  // console.log("email", email[0].value, "password", password[0].value);

  const data = {
    email: email[0].value,
    password: password[0].value,
  };
  console.log(data);
  $.ajax({
    type: "POST",
    url: "/api/user/login",
    data: data,
    success: function (response) {
      if (response.message === "로그인에 성공했습니다.") {
        alert("로그인에 성공하였습니다.");
        location.href = "/api/home";
      }
    },
  });
};
