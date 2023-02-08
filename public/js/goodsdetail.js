const addcart = () => {
  const data = {
    goodsId: "1",
    quanitity: "1",
  };
  $.ajax({
    type: "POST",
    url: "/api/user/cart",
    data: data,
    success: function (response) {
      console.log(response);
      if (response) {
        location.href = "/api/cart";
      }
    },
  });
};
const addcart = () => {
  const data = {
    goodsId: "1",
    quanitity: "1",
  };
  $.ajax({
    type: "POST",
    url: "/api/user/cart",
    data: data,
    success: function (response) {
      console.log(response);
      if (response) {
        location.href = "/api/cart";
      }
    },
  });
};
