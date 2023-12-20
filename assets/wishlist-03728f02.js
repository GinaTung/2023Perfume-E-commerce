import"./main-576b29f8.js";const u="https://ec-course-api.hexschool.io/v2/api/hex-project/products/all",i=document.querySelector(".product-wrap2"),p=document.querySelector(".product-select"),f=document.querySelector(".pagination");let o=[];function g(){axios.get(`${u}`).then(function(t){o=t.data.products,d(),b(),console.log(o)}).catch(function(t){console.log(t)})}g();function s(t){const a=h(t.id)?"bi-heart-fill":"bi-heart";return`
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
                <i class="bi ${a} fs-5 text-info js-addHeart" data-id="${t.id}"></i>
              </a>
              <a href="#" type="button" class=""><i class="bi bi-cart3 fs-5 text-info js-addCart" data-id="${t.id}"></i></a>
            </div>
          </div>
        </div>
      </div>
    `}function h(t){return(JSON.parse(localStorage.getItem("productIds"))||[]).includes(t)}function v(t){return`
    <nav aria-label="Page navigation example">
    <ul class="pagination mb-0 ">
      <li class=""><a class="p-4 text-decoration active text-info" href="#" aria-current="page">1</a></li>
    </ul>
  </nav>
    `}function b(t){let e="";e=v(),f.innerHTML=e}function l(t){let e="";t.forEach(function(a){e+=s(a)}),i.innerHTML=e}function d(){const t=JSON.parse(localStorage.getItem("productIds"))||[],e=m(t);l(e),x(e)}function m(t){return t.map(a=>o.find(n=>n.id===a))}function x(t){p.addEventListener("click",function(e){let a=e.target.getAttribute("data-name");if(a==="全部"){l(t);return}let n="",r=!1;t.forEach(function(c){a===c.category&&(console.log(c.category),n+=s(c),r=!0)}),r||(n=`
            <div class="col-12 bg-warning w-100 d-flex align-items-center justify-content-center fs-1" style="height:363px;">目前無<span class="text-decoration-underline">${a}</span>類別產品收藏</div>
        `),i.innerHTML=n})}document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll(".navbar-nav .nav-link").forEach(function(e){e.addEventListener("click",function(a){a.preventDefault();var n=e.getAttribute("data-name");t(n)})});function t(e){var a=window.location.pathname+"?category="+encodeURIComponent(e);history.pushState(null,null,a)}});i.addEventListener("click",function(t){t.preventDefault();const e=t.target.getAttribute("data-id"),a=t.target.closest(".bi-heart"),n=t.target.closest(".bi-heart-fill");(a||n)&&(y(a||n),L(e))});function y(t){t.classList.toggle("heart-click"),t.classList.toggle("bi-heart"),t.classList.toggle("bi-heart-fill")}function L(t){let e=JSON.parse(localStorage.getItem("productIds"))||[];const a=e.indexOf(t);a!==-1?e.splice(a,1):e.push(t),localStorage.setItem("productIds",JSON.stringify(e)),d()}
