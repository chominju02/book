class BookStore {
  constructor() {
    this.products = document.querySelector(".products");
    this.loadMoreBtn = document.querySelector("#load_more_btn");
    this.saveIt = JSON.parse(localStorage.getItem("saved-items")) || [];
    this.newProducts = [];
    this.nowCnt = 0;
  }

  // 책 정보 받아오는 부분
  fetchData() {
    fetch("http://43.203.50.204:8080/api/books/list")
      .then((response) => response.json())
      .then((data) => {
        this.newProducts = data;
        this.startLoad();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // 책 생성 부분
  createProduct(goods) {
    const productContainer = document.createElement("div");
    productContainer.classList.add("product");

    // 이미지
    const productImage = document.createElement("img");
    productImage.classList.add("book_img");
    productImage.src = goods.imagePath;
    productContainer.appendChild(productImage);

    // product1
    const productInfo1 = document.createElement("div");
    productInfo1.classList.add("product-information1");

    const productTitle = document.createElement("h3");
    productTitle.classList.add("title");
    productTitle.textContent = goods.title;
    productInfo1.appendChild(productTitle);

    const productAuthor = document.createElement("span");
    productAuthor.classList.add("author");
    productAuthor.textContent = goods.author;
    productInfo1.appendChild(productAuthor);

    productContainer.appendChild(productInfo1);

    // product2
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
  }

  // 처음 생성부분
  startLoad() {
    for (let i = 0; i < 3; i++) {
      const newProduct = this.createProduct(this.newProducts[i]);
      this.products.appendChild(newProduct);
    }
    this.nowCnt = 3;
  }

  // 더보기 버튼 클릭시
  loadMore() {
    this.loadMoreBtn.addEventListener("click", () => {
      const endCnt = this.nowCnt + 3;
      for (
        let i = this.nowCnt;
        i < endCnt && i < this.newProducts.length;
        i++
      ) {
        const newProduct = this.createProduct(this.newProducts[i]);
        this.products.appendChild(newProduct);
      }
      this.nowCnt += 3;
    });
  }

  // 이벤트 리스너 등록
  registerEventListeners() {
    this.products.addEventListener("click", (event) => {
      const target = event.target;
      if (!this.products.contains(target)) {
        return;
      }
      const product = target.closest(".product");
      if (!product) {
        return;
      }
      const productTitle = product.querySelector(".title").textContent;
      const productAuthor = product.querySelector(".author").textContent;
      const productPrice = product.querySelector(".price").textContent;
      const productImage = product.querySelector(".book_img").src;
      let description = "";
      let id = "";
      for (let i = 0; i < this.newProducts.length; i++) {
        if (this.newProducts[i].title === productTitle) {
          description = this.newProducts[i].description;
          id = this.newProducts[i].id;
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
      if (target.classList.contains("btn-add-cart")) {
        this.saveItems(selectedBookObj);
        alert("장바구니에 추가되었습니다");
      }
      if (target.classList.contains("book_img")) {
        let params = new URLSearchParams();
        params.append("id", id);
        params = params.toString();
        window.location.href = "detail.html?" + params;
      }
    });
  }

  // 장바구니에 상품 저장
  saveItems(bookObj) {
    bookObj.quantity = 1;
    this.saveIt.push(bookObj);
    localStorage.setItem("saved-items", JSON.stringify(this.saveIt));
  }

  // 장바구니 페이지로 이동
  goToCartPage() {
    const cartMenu = document.querySelector("#cart");
    cartMenu.addEventListener("click", () => {
      location.href = "cart.html";
    });
  }

  // post 페이지로 이동
  goToPostPage() {
    const postMenu = document.querySelector("#post");
    postMenu.addEventListener("click", () => {
      location.href = "post.html";
    });
  }

  // 책 목록 정렬
  sortBooks() {
    const selectBox = document.querySelector("#selectBox");
    selectBox.addEventListener("change", () => {
      const selectedOption = selectBox.value;
      switch (selectedOption) {
        case "sort-normal":
          this.newProducts.sort((a, b) => a.id - b.id);
          this.displayBooks();
          break;
        case "sort-lowPrice":
          this.newProducts.sort((a, b) => a.price - b.price);
          this.displayBooks();
          break;
        case "sort-highPrice":
          this.newProducts.sort((a, b) => b.price - a.price);
          this.displayBooks();
          break;
        case "sort-ascending":
          this.newProducts.sort((a, b) => a.title.localeCompare(b.title));
          this.displayBooks();
          break;
        case "sort-descending":
          this.newProducts.sort((a, b) => b.title.localeCompare(a.title));
          this.displayBooks();
          break;
        default:
          break;
      }
    });
  }

  // 책 목록 화면에 표시
  displayBooks() {
    this.products.innerHTML = "";
    this.startLoad();
  }

  // 초기화
  init() {
    this.fetchData();
    this.loadMore();
    this.registerEventListeners();
    this.goToCartPage();
    this.goToPostPage();
    this.sortBooks();
  }
}

const bookStore = new BookStore();
bookStore.init();
