const socket = io.connect("/");

socket.on("BUY_GOODS", function (data) {
  const { nickname, goodsId, goodsName, date } = data;
  makeBuyNotification(nickname, goodsName, goodsId, date);
});

function postOrder(user, order) {
  if (!order.length) {
    return;
  }

  socket.emit("BUY", {
    nickname: user.nickname,
    goodsId: order[0].goods.id,
    goodsName:
      order.length > 1
        ? `${order[0].goods.name} 외 ${order.length - 1}개의 상품`
        : order[0].goods.name,
  });
}


function makeBuyNotification(targetNickname, goodsName, goodsId, date) {
  const messageHtml = `${targetNickname}님이 방금 <a href="/detail.html?goodsId=${goodsId}" class="alert-link">${goodsName}</a>을 구매했어요! <br /><small>(${date})</small>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>`;
  const alt = $("#customerAlert");
  if (alt.length) {
    alt.html(messageHtml);
  } else {
    const htmlTemp = `<div class="alert alert-sparta alert-dismissible show fade" role="alert" id="customerAlert">${messageHtml}</div>`;
    $("body").append(htmlTemp);
  }
}
