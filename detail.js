window.addEventListener("DOMContentLoaded", () => {
  let queryParams = new URLSearchParams(location.search);
  let id = queryParams.get("id");

  fetch("http://43.203.50.204:8080/api/books?id=" + id)
    .then((res) => res.json())
    .then((data) => {
      createProduct(data);
      localStorage.setItem("selected-book", JSON.stringify(data));
    });
});

const createProduct = (savedProducts) => {
  const product = document.querySelector(".product");
  const productImg = document.createElement("img");
  productImg.classList.add("book_img");
  productImg.src = savedProducts.imagePath;
  product.appendChild(productImg);

  const bookInfo = document.createElement("div");
  bookInfo.classList.add("book_info");

  const bookPlusInfo = document.createElement("div");
  bookPlusInfo.classList.add("book_plus_info");

  const plusInfo = document.createElement("span");
  plusInfo.classList.add("plus_info");
  plusInfo.textContent = "MD픽";
  bookPlusInfo.appendChild(plusInfo);
  bookInfo.appendChild(bookPlusInfo);

  const plusInfo2 = document.createElement("span");
  plusInfo2.classList.add("plus_info");
  plusInfo2.textContent = "사은품";
  bookPlusInfo.appendChild(plusInfo2);
  bookInfo.appendChild(bookPlusInfo);

  const plusInfo3 = document.createElement("span");
  plusInfo3.classList.add("plus_info");
  plusInfo3.textContent = "소득공제";
  bookPlusInfo.appendChild(plusInfo3);
  bookInfo.appendChild(bookPlusInfo);

  const grade = document.createElement("div");
  grade.classList.add("grade");

  const gradeIcon = document.createElement("img");
  gradeIcon.classList.add("grade_icon");
  gradeIcon.src = "img/ranking.png";

  const gradeLabel = document.createElement("span");
  gradeLabel.classList.add("grade_label");
  const randomGrade = Math.floor(Math.random() * 20) + 1;
  gradeLabel.textContent = `실시간 Best ${randomGrade}위`;
  grade.appendChild(gradeIcon);
  grade.appendChild(gradeLabel);
  bookInfo.appendChild(grade);

  const bookTitle = document.createElement("h1");
  bookTitle.classList.add("book_title");
  bookTitle.textContent = savedProducts.title;
  bookInfo.appendChild(bookTitle);

  const bookAuthor = document.createElement("span");
  bookAuthor.classList.add("book_author");
  bookAuthor.textContent = savedProducts.author;
  bookInfo.appendChild(bookAuthor);

  const bookLabel = document.createElement("span");
  bookLabel.classList.add("book_label");
  bookLabel.textContent = "책소개";
  bookInfo.appendChild(bookLabel);

  const description = document.createElement("div");
  description.classList.add("description");

  const bookDescription = document.createElement("p");
  bookDescription.classList.add("book_description");
  bookDescription.textContent = savedProducts.description;
  description.appendChild(bookDescription);

  bookInfo.appendChild(description);

  product.appendChild(bookInfo);

  const bookPrice = document.querySelector(".book_price");
  bookPrice.classList.add("book_price");
  bookPrice.textContent = `${savedProducts.price}원`;
};

const home = document.querySelector(".home");
home.addEventListener("click", () => {
  location.href = "main.html";
});

const cart = document.querySelector(".cart");
cart.addEventListener("click", () => {
  location.href = "cart.html";
});

const addCartBtn = document.querySelector(".add-cart-btn");
addCartBtn.addEventListener("click", () => {
  alert("장바구니에 추가되었습니다.");
  const selectedProduct = JSON.parse(localStorage.getItem("selected-book"));
  selectedProduct.quantity = 1;

  const savedItems = JSON.parse(localStorage.getItem("saved-items"));
  if (savedItems) {
    savedItems.push(selectedProduct);
    localStorage.setItem("saved-items", JSON.stringify(savedItems));
  } else {
    const savedIt = [];
    savedIt.push(selectedProduct);
    localStorage.setItem("saved-items", JSON.stringify(savedIt));
  }
});
