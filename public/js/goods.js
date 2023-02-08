$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "/api/goods",
    data: {},
    success: function (response) {
      console.log(response);

      let rows = response["data"];

      for (let i = 0; i < rows.length; i++) {
        let name = rows[i].name;
        let price = rows[i].price;
        let goodId = rows[i].id;
        let goodId = rows[i].id;

        let temp_html = `<li onclick="location.href='/api/good/${goodId}'">
                            <div class="details">
                              <h2>${name}</h2>
                              <p class="price">${price}</p>
                              <div class="product">
                                <img
                                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/threadless01.jpg"
                                />
                              </div>
                            </div>
                          </li>`;

        $("#detail").append(temp_html);
      }
    },
  });
});
