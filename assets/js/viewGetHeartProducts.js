const api_url =
  "https://ec-course-api.hexschool.io/v2/api/hex-project/products/all";
const productWrap = document.querySelector(".product-wrap2");
const productSelect = document.querySelector(".product-select");
const paginationList = document.querySelector(".pagination");
let data = [];
function getProductList() {
  axios
    .get(`${api_url}`)
    .then(function (response) {
      // handle success
      data = response.data.products;
      //   renderProductList();
      renderProductData();
      renderPagination();
      //   changeProducts();
      // console.log(data);
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
          <img src="${item.image}" alt="${item.title}" style="height: 255px;object-fit: cover;" class="img-fluid">
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
    </ul>
  </nav>
    `;
}
function renderPagination(item) {
  let str = "";
  str = pagination();
  paginationList.innerHTML = str;
}
// 修正 renderProductList 函數
function renderProductList(products) {
  let str = "";
  products.forEach(function (item) {
    str += combineProductList(item);
  });
  productWrap.innerHTML = str;
}

// 收藏頁面的渲染產品資料函數
function renderProductData() {
  if (!checkIfCollectionExists()) {
    // 如果未有收藏，結束函數
    return;
  }
  const productIds = JSON.parse(localStorage.getItem("productIds")) || [];
  const productData = getProductDataById(productIds);
  renderProductList(productData);
  changeProducts(productData);
}
// 在這裡加入檢查是否有收藏 ID 的邏輯
function checkIfCollectionExists() {
  const productIds = JSON.parse(localStorage.getItem("productIds")) || [];

  if (productIds.length === 0) {
    // 若資料為空，顯示未收藏畫面文字
    productWrap.innerHTML = `
      <div class="col-12 bg-warning w-100 d-flex align-items-center justify-content-center fs-1" style="height:363px;">目前無任何產品收藏</div>
    `;
    return false; // 表示未有收藏
  }

  return true; // 表示有收藏
}
// 根據產品ID獲取產品資料的函數
function getProductDataById(productIds) {
  const filteredProducts = productIds.map((productId) => {
    return data.find((item) => item.id === productId);
  });
  return filteredProducts;
}

// 監聽篩選
function changeProducts(products) {
  productSelect.addEventListener("click", function (e) {
    let productType = e.target.getAttribute("data-name");
    if (productType === "全部") {
      if (products.length === 0) {
        // 若資料為空，顯示無資料畫面文字
        productWrap.innerHTML = `
          <div class="col-12 bg-warning w-100 d-flex align-items-center justify-content-center fs-1" style="height:363px;">目前無任何產品收藏</div>
        `;
      } else {
        // 將所有在收藏列表中的產品顯示在畫面上
        const favoriteProducts = products.filter((item) =>
          isProductFavorite(item.id)
        );
        if (favoriteProducts.length === 0) {
          // 若資料為空，顯示無資料畫面文字
          productWrap.innerHTML = `
            <div class="col-12 bg-warning w-100 d-flex align-items-center justify-content-center fs-1" style="height:363px;">目前無任何產品收藏</div>
          `;
        } else {
          renderProductList(favoriteProducts);
        }
      }
      return;
    }

    let str = "";
    let hasCategory = false; // 用於標記是否有相應的產品類別
    products.forEach(function (item) {
      const isFavorite = isProductFavorite(item.id); // 檢查是否已經收藏
      if (productType === item.category && isFavorite) {
        // console.log(item.category);
        str += combineProductList(item);
        hasCategory = true;
      }
    });
    if (!hasCategory) {
      str = `
            <div class="col-12 bg-warning w-100 d-flex align-items-center justify-content-center fs-1" style="height:363px;">目前無<span class="text-decoration-underline">${productType}</span>類別產品收藏</div>
        `;
    }
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

productWrap.addEventListener("click", function (e) {
  e.preventDefault();

  // 獲取產品ID
  const productId = e.target.getAttribute("data-id");

  // 確保點擊的是愛心圖標
  const heartIcon = e.target.closest(".bi-heart");
  const heartIconFill = e.target.closest(".bi-heart-fill");

  if (heartIcon || heartIconFill) {
    // 處理愛心點擊事件
    if(heartIcon){
      Swal.fire({
        title: "已加入我的收藏",
        confirmButtonColor: "#916000",
        confirmButtonText: "OK"
      });
      handleHeartClick(heartIcon);
      // 將產品ID存儲在localStorage中
    saveProductIdToLocalStorage(productId);
    }else{
      Swal.fire({
        title: "已移除我的收藏",
        confirmButtonColor: "#916000",
        confirmButtonText: "OK"
      });
      handleHeartClick(heartIconFill);
      saveProductIdToLocalStorage(productId);
    }
  }
});

// 愛心點擊處理函數
function handleHeartClick(heartIcon) {
  // heartIcon.classList.toggle("heart-click");
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
  renderProductData();
}
