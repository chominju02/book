const products = document.querySelector(".products");
const product = document.querySelectorAll(".product");

fetch("https://shopping-mall-rzdwe.run.goorm.site/books/")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((goods) => {
      const newProduct = createProduct(goods);
      products.appendChild(newProduct);
    });
  });

// const createProduct = function(goods) {
//     const productContainer = document.createElement("div");
//     productContainer.classList.add("book");

// }
