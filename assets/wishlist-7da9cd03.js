import"./main-c535622e.js";const h="https://ec-course-api.hexschool.io/v2/api/hex-project/products/all",c=document.querySelector(".product-wrap2"),v=document.querySelector(".product-select"),b=document.querySelector(".pagination");let u=[];function x(){axios.get(`${h}`).then(function(t){u=t.data.products,p(),y()}).catch(function(t){console.log(t)})}x();function f(t){const n=o(t.id)?"bi-heart-fill":"bi-heart";return`
      <div class="col-6 col-lg-3">
        <div class="card border-0">
          <img src="${t.image}" alt="${t.title}" style="height: 255px;object-fit: cover;" class="img-fluid">
          <div class="card-body p-0">
            <h5 class="card-title mb-0 fw-semibold">${t.title}</h5>
            <p class="card-text mb-0 fw-light">${t.category}</p>
            <p class="card-text d-flex mb-0">
              <span class="pe-2 fw-light">NT$${t.price}</span>
              <span class="text-decoration-line-through text-light2 fw-light">NT$${t.origin_price}</span>
            </p>
            <div class="d-flex">
              <a href="#" class="me-3" type="button">
                <i class="bi ${n} fs-5 text-info js-addHeart" data-id="${t.id}"></i>
              </a>
              <a href="#" type="button" class=""><i class="bi bi-cart3 fs-5 text-info js-addCart" data-id="${t.id}"></i></a>
            </div>
          </div>
        </div>
      </div>
    `}function o(t){return(JSON.parse(localStorage.getItem("productIds"))||[]).includes(t)}function m(t){return`
    <nav aria-label="Page navigation example">
    <ul class="pagination mb-0 ">
      <li class=""><a class="p-4 text-decoration active text-info" href="#" aria-current="page">1</a></li>
    </ul>
  </nav>
    `}function y(t){let e="";e=m(),b.innerHTML=e}function g(t){let e="";t.forEach(function(n){e+=f(n)}),c.innerHTML=e}function p(){if(!I())return;const t=JSON.parse(localStorage.getItem("productIds"))||[],e=L(t);g(e),S(e)}function I(){return(JSON.parse(localStorage.getItem("productIds"))||[]).length===0?(c.innerHTML=`
      <div class="col-12 bg-warning w-100 d-flex align-items-center justify-content-center fs-1" style="height:363px;">目前無任何產品收藏</div>
    `,!1):!0}function L(t){return t.map(n=>u.find(i=>i.id===n))}function S(t){v.addEventListener("click",function(e){let n=e.target.getAttribute("data-name");if(n==="全部"){if(t.length===0)c.innerHTML=`
          <div class="col-12 bg-warning w-100 d-flex align-items-center justify-content-center fs-1" style="height:363px;">目前無任何產品收藏</div>
        `;else{const a=t.filter(r=>o(r.id));a.length===0?c.innerHTML=`
            <div class="col-12 bg-warning w-100 d-flex align-items-center justify-content-center fs-1" style="height:363px;">目前無任何產品收藏</div>
          `:g(a)}return}let i="",s=!1;t.forEach(function(a){const r=o(a.id);n===a.category&&r&&(i+=f(a),s=!0)}),s||(i=`
            <div class="col-12 bg-warning w-100 d-flex align-items-center justify-content-center fs-1" style="height:363px;">目前無<span class="text-decoration-underline">${n}</span>類別產品收藏</div>
        `),c.innerHTML=i})}document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll(".navbar-nav .nav-link").forEach(function(e){e.addEventListener("click",function(n){n.preventDefault();var i=e.getAttribute("data-name");t(i)})});function t(e){var n=window.location.pathname+"?category="+encodeURIComponent(e);history.pushState(null,null,n)}});c.addEventListener("click",function(t){t.preventDefault();const e=t.target.getAttribute("data-id"),n=t.target.closest(".bi-heart"),i=t.target.closest(".bi-heart-fill");(n||i)&&(n?(Swal.fire({title:"已加入我的收藏",confirmButtonColor:"#916000",confirmButtonText:"OK"}),l(n),d(e)):(Swal.fire({title:"已移除我的收藏",confirmButtonColor:"#916000",confirmButtonText:"OK"}),l(i),d(e)))});function l(t){t.classList.toggle("bi-heart"),t.classList.toggle("bi-heart-fill")}function d(t){let e=JSON.parse(localStorage.getItem("productIds"))||[];const n=e.indexOf(t);n!==-1?e.splice(n,1):e.push(t),localStorage.setItem("productIds",JSON.stringify(e)),p()}
