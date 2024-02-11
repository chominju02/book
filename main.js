const products = document.querySelector(".products");
const product = document.querySelectorAll(".product");
const loadMoreBtn = document.querySelector("#load_more_btn");
const saveIt = [];
const newProducts = [];

fetch("https://shopping-mall-rzdwe.run.goorm.site/books/")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((goods) => {
      newProducts.push(goods);
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
  productPrice.textContent = goods.price;
  productInfo2.appendChild(productPrice);

  const productCartBtn = document.createElement("button");
  productCartBtn.classList.add("btn-add-cart");
  productCartBtn.textContent = "장바구니 담기";
  productInfo2.appendChild(productCartBtn);

  productContainer.appendChild(productInfo2);

  return productContainer;
};

//더보기 누르면 product 3개씩 추가
const loadCnt = 3;
let nowCnt = 0;
let endCnt = 0;
loadMoreBtn.addEventListener("click", () => {
  endCnt = nowCnt + loadCnt;
  if (endCnt > newProducts.length) endCnt = newProducts.length;
  console.log(nowCnt, endCnt);
  for (let i = nowCnt; i < endCnt; i++) {
    const newProduct = createProduct(newProducts[i]);
    products.appendChild(newProduct);
  }
  nowCnt = nowCnt + loadCnt;
});

//장바구니 담기 버튼 클릭시 localstorage에 저장
// 상위 요소에 이벤트 리스너 추가
products.addEventListener("click", (event) => {
  const target = event.target;

  // 클릭된 요소가 장바구니 버튼인지 확인
  if (target.classList.contains("btn-add-cart")) {
    console.log("clicked");
    const product = target.closest(".product"); // 가장 가까운 부모 요소인 상품 요소를 찾음
    const productTitle = product.querySelector(".title").textContent;
    const productAuthor = product.querySelector(".author").textContent;
    const productPrice = product.querySelector(".price").textContent;
    const productImage = product.querySelector(".book_img").src;

    saveItems(productTitle, productAuthor, productPrice, productImage);
  }
});

const saveItems = (productTitle, productAuthor, productPrice, productImage) => {
  const bookObj = {
    title: productTitle,
    author: productAuthor,
    price: productPrice,
    imageNum: productImage,
    quantity: 1,
  };
  saveIt.push(bookObj);
  localStorage.setItem("saved-items", JSON.stringify(saveIt));
};

const savedProducts = JSON.parse(localStorage.getItem("saved-items"));
const cartItems = [];

if (savedProducts) {
  for (let i = 0; i < savedProducts.length; i++) {
    saveIt.push(savedProducts[i]);
  }
}
