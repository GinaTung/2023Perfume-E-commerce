import"./main-576b29f8.js";const s="https://ec-course-api.hexschool.io/v2/api/hex-project/products/all",i=document.querySelector(".product-wrap"),l=document.querySelector(".product-select"),d=document.querySelector(".pagination");let o=[];function u(){axios.get(`${s}`).then(function(t){o=t.data.products,n(),g(),h(),console.log(o)}).catch(function(t){console.log(t)})}u();function r(t){const a=p(t.id)?"bi-heart-fill":"bi-heart";return`
    <div class="col-6 col-lg-3">
    <div class="card border-0">
      <img src="${t.image}" alt="${t.title}" style="height: 255px;object-fit: cover;"
        class="img-fluid">
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
    `}function p(t){return(JSON.parse(localStorage.getItem("productIds"))||[]).includes(t)}function f(t){return`
  <nav aria-label="Page navigation example">
  <ul class="pagination mb-0 ">
    <li class=""><a class="p-4 text-decoration active text-info" href="#" aria-current="page">1</a></li>
    <li class=""><a class="p-4 text-decoration-none text-info" href="#" >2</a></li>
    <li class=""><a class="p-4 text-decoration-none text-info" href="#" >3</a></li>
  </ul>
</nav>
    `}function g(t){let e="";e=f(),d.innerHTML=e}function n(){let t="";o.forEach(function(e){t+=r(e)}),i.innerHTML=t}function h(){l.addEventListener("click",function(t){let e=t.target.getAttribute("data-name");if(e==="全部"){n();return}let a="";o.forEach(function(c){e===c.category&&(console.log(c.category),a+=r(c))}),i.innerHTML=a})}document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll(".navbar-nav .nav-link").forEach(function(e){e.addEventListener("click",function(a){a.preventDefault();var c=e.getAttribute("data-name");t(c)})});function t(e){var a=window.location.pathname+"?category="+encodeURIComponent(e);history.pushState(null,null,a)}});i.addEventListener("click",function(t){t.preventDefault();const e=t.target.getAttribute("data-id"),a=t.target.closest(".bi-heart"),c=t.target.closest(".bi-heart-fill");(a||c)&&(v(a||c),b(e))});function v(t){t.classList.toggle("heart-click"),t.classList.toggle("bi-heart"),t.classList.toggle("bi-heart-fill")}function b(t){let e=JSON.parse(localStorage.getItem("productIds"))||[];const a=e.indexOf(t);a!==-1?e.splice(a,1):e.push(t),localStorage.setItem("productIds",JSON.stringify(e)),n()}
