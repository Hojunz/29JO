$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "/api/user/cart",
    data: {},
    success: function (response) {
      let rows = response["data"];

      for (let i = 0; i < rows.length; i++) {
        let name = rows[i].Good.name;
        let price = rows[i].Good.price;
        let quantity = rows[i].quanitity;
        let userId = rows[i].userId;
        let cartId = rows[i].id;

        let temp_html = `<tr>
                        <td>
                            <figure class="itemside align-items-center">
                                <div class="aside"><img src="https://i.imgur.com/1eq5kmC.png" class="img-sm"></div>
                                <figcaption class="info"> <a href="#" class="title text-dark" data-abc="true">${name}</a>
                                </figcaption>
                            </figure>
                        </td>
                        <td>   <input type="number" name="num" class="num" min="1" value="${quantity}"></td>
                        <td>
                            <div class="price-wrap"> <var class="price">${price}</var></div>
                        </td>
                        <td class="text-right d-none d-md-block"> <a data-original-title="Save to Wishlist" title="" href="" class="btn btn-light" data-toggle="tooltip" data-abc="true"> <i class="fa fa-heart"></i></a> <a class="btn btn-light" data-abc="true" onclick="deletecart(${cartId})"> Remove</a> </td>
                        </tr>`;

        $("#carts").append(temp_html);
      }
    },
  });
});

const deletecart = (cartId) => {
  const check = confirm("정말로 요청을 취소하시겠습니까?");

  if (check === false) {
    return;
  }

  $.ajax({
    type: "DELETE",
    url: `/api/user/cart/${cartId}`,
    data: { cartId },
    success: function (response) {
      console.log(response);
      if (response.message === "") {
        alert("해당 상품이 존재하지 않거나, 혹은 이미 삭제된 상태입니다.");
        return;
      }
      location.reload();
    },
  });
};
