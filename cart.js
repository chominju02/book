const resultElement = document.querySelector(".quantity_result");
let number = parseInt(resultElement.textContent);

// 수량버튼
const count = function (type) {
  console.log("버튼 클릭");
  console.log(number);
  console.log(type);

  if (type === "plus") {
    number += 1;
    console.log(number);
  } else if (type === "minus" && number > 1) {
    number -= 1;
    console.log(number);
  }
  resultElement.textContent = number.toString();
};

//정보를 받아오는 부분
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

//product 생성
const createProduct = (goods) => {
  // product
  const productContainer = document.createElement("div");
  productContainer.classList.add("product");

  //checkbox
  const productCheckContainer = document.createElement("div");
  productCheckContainer.classList.add("product_check");

  const productCheck = document.createElement("input");
  productCheck.classList.add("book_check");
  productCheck.type = "checkbox";

  productCheckContainer.appendChild(productCheck);
  productContainer.appendChild(productCheckContainer);

  //image
  const productImage = document.createElement("img");
  productImage.classList.add("book_img");
  productImage.src = goods.imageNum;

  productContainer.appendChild(productImage);

  //product info
  const productInfo = document.createElement("div");
  productInfo.classList.add("product-information");

  const productTitle = document.createElement("h3");
  productTitle.classList.add("title");
  productTitle.textContent = goods.title;
  productInfo.appendChild(productTitle);

  const productAuthor = document.createElement("span");
  productAuthor.classList.add("author");
  productAuthor.textContent = goods.author;
  productInfo.appendChild(productAuthor);

  const productPrice = document.createElement("span");
  productPrice.classList.add("price");
  productPrice.textContent = `${goods.price}원`;
  productInfo.appendChild(productPrice);

  productContainer.appendChild(productInfo);

  //product_price
  const productPriceContainer = document.createElement("div");
  productPriceContainer.classList.add("product_total_price");

  const productTotalPrice = document.createElement("div");
  productTotalPrice.classList.add("product_price");
  productTotalPrice.textContent = `${goods.price * number}원`;

  productPriceContainer.appendChild(productTotalPrice);

  const productQuantity = document.createElement("div");
  productQuantity.classList.add("product_quantity");

  const quantityMinus = document.createElement("input");
  quantityMinus.type = "button";
  quantityMinus.value = "-";
  quantityMinus.classList.add("minus");
  quantityMinus.onclick = () => count("minus");
  productQuantity.appendChild(quantityMinus);

  const quantityResult = document.createElement("div");
  quantityResult.classList.add("quantity_result");
  quantityResult.textContent = "1";
  productQuantity.appendChild(quantityResult);

  const quantityPlus = document.createElement("input");
  quantityPlus.type = "button";
  quantityPlus.value = "+";
  quantityPlus.classList.add("plus");
  quantityPlus.onclick = () => count("plus");
  productQuantity.appendChild(quantityPlus);

  productPriceContainer.appendChild(productQuantity);

  productContainer.appendChild(productPriceContainer);

  return productContainer;
};

//전체 체크박스
const allCheck = document.querySelector(".check_all");
const productCheck = document.querySelectorAll(".book_check");

allCheck.addEventListener("change", () => {
  const isChecked = allCheck.checked;
  productCheck.forEach((check) => {
    check.checked = isChecked;
  });
});
