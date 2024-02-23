// const resultElement = document.querySelector(".quantity_result");
// let number = parseInt(resultElement.textContent);

// 수량버튼
// const count = function (type) {
//   console.log("버튼 클릭");
//   console.log(number);
//   console.log(type);

//   if (type === "plus") {
//     number += 1;
//     console.log(number);
//   } else if (type === "minus" && number > 1) {
//     number -= 1;
//     console.log(number);
//   }
//   resultElement.textContent = number.toString();
// };

//정보를 받아오는 부분
const products = document.querySelector(".products");
const product = document.querySelectorAll(".product");

// fetch("https://shopping-mall-rzdwe.run.goorm.site/books/")
//   .then((response) => response.json())
//   .then((data) => {
//     data.forEach((goods) => {
//       const newProduct = createProduct(goods);
//       products.appendChild(newProduct);
//     });
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// //product 생성
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
  productImage.src = goods.imagePath;

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
  productTotalPrice.textContent = `${goods.price * goods.quantity}원`;

  productPriceContainer.appendChild(productTotalPrice);

  const productQuantity = document.createElement("div");
  productQuantity.classList.add("product_quantity");

  const quantityLabel = document.createElement("span");
  quantityLabel.classList.add("quantity_label");
  quantityLabel.textContent = "수량:";
  productQuantity.appendChild(quantityLabel);

  const quantityCnt = document.createElement("span");
  quantityCnt.classList.add("quantity_cnt");
  quantityCnt.textContent = goods.quantity;
  productQuantity.appendChild(quantityCnt);

  productPriceContainer.appendChild(productQuantity);

  productContainer.appendChild(productPriceContainer);

  return productContainer;
};

const savedProducts = JSON.parse(localStorage.getItem("saved-items"));
let totalPrice = 0;
const cartItems = [];

if (savedProducts) {
  for (let i = 0; i < savedProducts.length; i++) {
    let chk = 0;
    //cart에 item이 있다면 새로 product를 생성하는 것이 아니라 수량을 올리기
    if (cartItems) {
      for (let j = 0; j < cartItems.length; j++) {
        if (cartItems[j].title === savedProducts[i].title) {
          cartItems[j].quantity += 1;
          chk = 1;
          break;
        }
      }
      if (chk === 0) {
        cartItems.push(savedProducts[i]);
      }
    } else {
      cartItems.push(savedProducts[i]);
    }
    //총 가격
    totalPrice += parseInt(savedProducts[i].price);
  }
  for (let i = 0; i < cartItems.length; i++) {
    const newProduct = createProduct(cartItems[i]);
    products.appendChild(newProduct);
  }
}
//배송비 포함한 총가격 (7만원이상 무료배송)
const productPayment = document.querySelector(".all_product_price");
productPayment.textContent = `${totalPrice}원`;
if (totalPrice >= 70000) {
  document.querySelector(".delivery_price").textContent = "0원";
  document.querySelector("#total_price").textContent = `${totalPrice}원`;
} else if (totalPrice === 0) {
  document.querySelector(".delivery_price").textContent = "0원";
  document.querySelector("#total_price").textContent = `${totalPrice}원`;
} else {
  document.querySelector("#total_price").textContent = `${totalPrice + 2500}원`;
}

// window.addEventListener("scroll", () => {
//   document.querySelector(".payment").style.position = "fixed";
// });

//전체선택
const productCheckBox = document.querySelectorAll(".book_check");
const allCheck = document.querySelector(".check_all");

allCheck.addEventListener("click", () => {
  if (allCheck.checked) {
    productCheckBox.forEach((check) => {
      check.checked = true;
    });
  } else {
    productCheckBox.forEach((check) => {
      check.checked = false;
    });
  }
});
