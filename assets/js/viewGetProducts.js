const api_url =
  "https://ec-course-api.hexschool.io/v2/api/hex-project/products/all";
const productWrap = document.querySelector(".product-wrap");
const productSelect = document.querySelector(".product-select");
const paginationList = document.querySelector(".pagination");
let data = [];
function getProductList() {
  axios
    .get(`${api_url}`)
    .then(function (response) {
      // handle success
      data = response.data.products;
      renderProductList();
      renderPagination();
      changeProducts();
      console.log(data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
getProductList();

function combineProductList(item) {
  const isFavorite = isProductFavorite(item.id); // 檢查是否已經收藏
  const heartClass = isFavorite ? "bi-heart-fill" : "bi-heart"; // 設置愛心的初始狀態
  return `
    <div class="col-6 col-lg-3">
    <div class="card border-0">
      <img src="${item.image}" alt="${item.title}" style="height: 255px;object-fit: cover;"
        class="img-fluid">
      <div class="card-body p-0">
        <h5 class="card-title mb-0 fw-semibold">${item.title}</h5>
        <p class="card-text mb-0 fw-light">${item.category}</p>
        <p class="card-text d-flex mb-0">
          <span class="pe-2 fw-light">NT$${item.price}</span>
          <span class="text-decoration-line-through text-light2 fw-light">NT$${item.origin_price}</span>
        </p>
        <div class="d-flex">
          <a href="#" class="me-3" type="button">
            <i class="bi ${heartClass} fs-5 text-info js-addHeart" data-id="${item.id}"></i>
          </a>
          <a href="#" type="button" class=""><i class="bi bi-cart3 fs-5 text-info js-addCart" data-id="${item.id}"></i></a>
        </div>
      </div>
    </div>
  </div>
    `;
}
// 檢查產品是否已經收藏
function isProductFavorite(productId) {
  const productIds = JSON.parse(localStorage.getItem("productIds")) || [];
  return productIds.includes(productId);
}
function pagination(item) {
  return `
  <nav aria-label="Page navigation example">
  <ul class="pagination mb-0 ">
    <li class=""><a class="p-4 text-decoration active text-info" href="#" aria-current="page">1</a></li>
    <li class=""><a class="p-4 text-decoration-none text-info" href="#" >2</a></li>
    <li class=""><a class="p-4 text-decoration-none text-info" href="#" >3</a></li>
  </ul>
</nav>
    `;
}
function renderPagination(item) {
  let str = "";
  str = pagination();
  paginationList.innerHTML = str;
}
function renderProductList() {
  let str = "";
  data.forEach(function (item) {
    str += combineProductList(item);
  });
  productWrap.innerHTML = str;
}

// 監聽篩選
function changeProducts() {
  productSelect.addEventListener("click", function (e) {
    //   console.log(e.target);
    let productType = e.target.getAttribute("data-name");
    if (productType === "全部") {
      renderProductList();
      return;
    }

    let str = "";
    data.forEach(function (item) {
      if (productType === item.category) {
        console.log(item.category);
        str += combineProductList(item);
      }
    });
    productWrap.innerHTML = str;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // 添加事件監聽器
  document.querySelectorAll(".navbar-nav .nav-link").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var dataName = link.getAttribute("data-name");
      updateURL(dataName);
    });
  });

  // 更新網址的函數
  function updateURL(category) {
    var newURL =
      window.location.pathname + "?category=" + encodeURIComponent(category);
    history.pushState(null, null, newURL);
  }
});

// A頁面的點擊事件處理邏輯
productWrap.addEventListener("click", function (e) {
  e.preventDefault();

  // 獲取產品ID
  const productId = e.target.getAttribute("data-id");

  // 確保點擊的是愛心圖標
  const heartIcon = e.target.closest(".bi-heart");
  const heartIconFill = e.target.closest(".bi-heart-fill");

  if (heartIcon || heartIconFill) {
    // 處理愛心點擊事件
    handleHeartClick(heartIcon || heartIconFill);

    // 將產品ID存儲在localStorage中
    saveProductIdToLocalStorage(productId);
  }
});

// 愛心點擊處理函數
function handleHeartClick(heartIcon) {
  heartIcon.classList.toggle("heart-click");
  heartIcon.classList.toggle("bi-heart");
  heartIcon.classList.toggle("bi-heart-fill");
}

// 將產品ID存儲在localStorage中
function saveProductIdToLocalStorage(productId) {
  // 先獲取已有的產品ID數組
  let productIds = JSON.parse(localStorage.getItem("productIds")) || [];
  const index = productIds.indexOf(productId);

  if (index !== -1) {
    // 如果產品已經在收藏列表中，則從列表中移除
    productIds.splice(index, 1);
  } else {
    // 如果產品不在收藏列表中，則添加到列表
    productIds.push(productId);
  }
  // 更新 localStorage 中的收藏列表
  localStorage.setItem("productIds", JSON.stringify(productIds));

  // 重新渲染產品列表
  renderProductList();
}
