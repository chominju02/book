const products = document.querySelector(".products");
const product = document.querySelectorAll(".product");

fetch("https://shopping-mall-rzdwe.run.goorm.site/books/")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((goods) => {
      const newProduct = createProduct(goods);
      products.appendChild(newProduct);
    });
  })
  .catch((error) => {
    console.error(error);
  });

const createProduct = function (goods) {
  const productContainer = document.createElement("div");
  productContainer.classList.add("product");

  //image
  const productImage = document.createElement("img");
  productImage.classList.add("book_img");
  productImage.src = goods.imageNum;

  productContainer.appendChild(productImage);

  //product info1
  const productInfo = document.createElement("div");
  productInfo.classList.add("product-information1");

  const productTitle = document.createElement("h3");
  productTitle.classList.add("title");
  productTitle.textContent = goods.title;
  productInfo.appendChild(productTitle);

  const productAuthor = document.createElement("span");
  productAuthor.classList.add("author");
  productAuthor.textContent = goods.author;
  productInfo.appendChild(productAuthor);

  productContainer.appendChild(productInfo);

  //product info2
  const productInfo2 = document.createElement("div");
  productInfo2.classList.add("product-information2");

  const productPrice = document.createElement("span");
  productPrice.classList.add("price");
  productPrice.textContent = `${goods.price}원`;
  productInfo2.appendChild(productPrice);

  const productCartBtn = document.createElement("button");
  productCartBtn.classList.add("cart-btn");
  productCartBtn.textContent = "장바구니 담기";
  productInfo2.appendChild(productCartBtn);

  productContainer.appendChild(productInfo2);

  return productContainer;
};
