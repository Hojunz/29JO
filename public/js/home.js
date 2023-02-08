console.clear();

const elApp = document.querySelector("#app");
const elProducts = document.querySelectorAll(".product");

let product = 0;
elProducts[product].dataset.active = true;
elApp.dataset.product = product + 1;
elApp.dataset.productCount = elProducts.length;

app.addEventListener("click", () => {
  delete elProducts[product].dataset.active;
  product = (product + 1) % elProducts.length;
  elApp.dataset.product = product + 1;
  elProducts[product].dataset.active = true;
});

/* ---------------------------------- */

document.addEventListener("mousemove", (e) => {
  document.documentElement.style.setProperty("--mouse-x", e.clientX + "px");
  document.documentElement.style.setProperty("--mouse-y", e.clientY + "px");
});
