const products = document.querySelector(".products");
const product = document.querySelectorAll(".product");
const loadMoreBtn = document.querySelector("#load_more_btn");
const saveIt = [];
let newProducts = [];

//책 정보 받아오는 부분
window.addEventListener("DOMContentLoaded", () => {
  fetch("http://43.203.50.204:8080/api/books/list")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((goods) => {
        newProducts.push(goods);
      });
      startLoad();
    })
    .catch((error) => {
      console.error(error);
    });
});

//책 생성 부분
const createProduct = function (goods) {
  const productContainer = document.createElement("div");
  productContainer.classList.add("product");

  //image
  const productImage = document.createElement("img");
  productImage.classList.add("book_img");
  productImage.src = goods.imagePath;

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
// const loadCnt = 3;
// let nowCnt = 0;
// let endCnt = 0;
// endCnt = nowCnt + loadCnt;
// for (let i = nowCnt; i < endCnt; i++) {
//   const newProduct = createProduct(newProducts[i]);
//   products.appendChild(newProduct);
// }
// nowCnt = nowCnt + loadCnt;

const loadCnt = 3;
let nowCnt = 0;
let endCnt = 0;

function startLoad() {
  for (i = 0; i < 3; i++) {
    const newProduct = createProduct(newProducts[i]);
    products.appendChild(newProduct);
  }
  nowCnt = 3;
}

//누르면 더 보여주는 부분
loadMoreBtn.addEventListener("click", () => {
  endCnt = nowCnt + loadCnt;
  if (endCnt > newProducts.length) endCnt = newProducts.length;
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
  if (!products.contains(target)) {
    return;
  }
  const product = target.closest(".product"); // 가장 가까운 부모 요소인 상품 요소를 찾음
  if (!product) {
    return;
  }
  const productTitle = product.querySelector(".title").textContent;
  const productAuthor = product.querySelector(".author").textContent;
  const productPrice = product.querySelector(".price").textContent;
  const productImage = product.querySelector(".book_img").src;

  let description = "";
  let id = "";
  for (i = 0; i < newProducts.length; i++) {
    if (newProducts[i].title === productTitle) {
      description = newProducts[i].description;
      id = newProducts[i].id;
      break;
    }
  }
  const selectedBookObj = {
    id: id,
    title: productTitle,
    author: productAuthor,
    price: productPrice,
    imagePath: productImage,
    description: description,
  };

  // 클릭된 요소가 장바구니 버튼인지 확인
  if (target.classList.contains("btn-add-cart")) {
    console.log("clicked");
    saveItems(selectedBookObj);
    alert("장바구니에 추가되었습니다");
  }
  // 클릭된 요소가 사진이라면 상세페이지로 이동
  if (target.classList.contains("book_img")) {
    // localStorage.setItem("selected-book", JSON.stringify(selectedBookObj));

    let params = new URLSearchParams();
    params.append("id", id);
    params = params.toString();
    window.location.href = "detail.html?" + params;
  }
});

const saveItems = (bookObj) => {
  bookObj.quantity = 1;
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

const cartMenu = document.querySelector("#cart");
cartMenu.addEventListener("click", () => {
  location.href = "cart.html";
});

const postMenu = document.querySelector("#post");
postMenu.addEventListener("click", () => {
  location.href = "post.html";
});

//sorting
const displayBooks = function () {
  products.innerHTML = "";
  startLoad();
};

const selectBox = document.querySelector("#selectBox");
selectBox.addEventListener("change", () => {
  const selectedOption = selectBox.value;

  switch (selectedOption) {
    case "sort-normal":
      newProducts.sort((a, b) => a.id - b.id);
      displayBooks(newProducts);
      break;
    case "sort-lowPrice":
      newProducts.sort((a, b) => a.price - b.price);
      displayBooks(newProducts);
      break;
    case "sort-highPrice":
      newProducts.sort((a, b) => b.price - a.price);
      displayBooks(newProducts);
      break;
    case "sort-ascending":
      newProducts.sort((a, b) => a.title.localeCompare(b.title));
      displayBooks(newProducts);
      break;
    case "sort-descending":
      newProducts.sort((a, b) => b.title.localeCompare(a.title));
      displayBooks(newProducts);
      break;
    default:
      break;
  }
});
