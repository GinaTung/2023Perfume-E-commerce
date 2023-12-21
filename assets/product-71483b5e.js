import"./main-c535622e.js";const d="https://ec-course-api.hexschool.io/v2/api/hex-project/products/all",n=document.querySelector(".product-wrap"),u=document.querySelector(".product-select"),f=document.querySelector(".pagination");let o=[];function p(){axios.get(`${d}`).then(function(t){o=t.data.products,c(),v(),b()}).catch(function(t){console.log(t)})}p();function l(t){const a=g(t.id)?"bi-heart-fill":"bi-heart";return`
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
    `}function g(t){return(JSON.parse(localStorage.getItem("productIds"))||[]).includes(t)}function h(t){return`
  <nav aria-label="Page navigation example">
  <ul class="pagination mb-0 ">
    <li class=""><a class="p-4 text-decoration active text-info" href="#" aria-current="page">1</a></li>
    <li class=""><a class="p-4 text-decoration-none text-info" href="#" >2</a></li>
    <li class=""><a class="p-4 text-decoration-none text-info" href="#" >3</a></li>
  </ul>
</nav>
    `}function v(t){let e="";e=h(),f.innerHTML=e}function c(){let t="";o.forEach(function(e){t+=l(e)}),n.innerHTML=t}function b(){u.addEventListener("click",function(t){let e=t.target.getAttribute("data-name");if(e==="全部"){c();return}let a="";o.forEach(function(i){e===i.category&&(a+=l(i))}),n.innerHTML=a})}document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll(".navbar-nav .nav-link").forEach(function(e){e.addEventListener("click",function(a){a.preventDefault();var i=e.getAttribute("data-name");t(i)})});function t(e){var a=window.location.pathname+"?category="+encodeURIComponent(e);history.pushState(null,null,a)}});n.addEventListener("click",function(t){t.preventDefault();const e=t.target.getAttribute("data-id"),a=t.target.closest(".bi-heart"),i=t.target.closest(".bi-heart-fill");(a||i)&&(a?(Swal.fire({title:"已加入我的收藏",confirmButtonColor:"#916000",confirmButtonText:"OK"}),r(a),s(e)):(Swal.fire({title:"已移除我的收藏",confirmButtonColor:"#916000",confirmButtonText:"OK"}),r(i),s(e)))});function r(t){t.classList.toggle("bi-heart"),t.classList.toggle("bi-heart-fill")}function s(t){let e=JSON.parse(localStorage.getItem("productIds"))||[];const a=e.indexOf(t);a!==-1?e.splice(a,1):e.push(t),localStorage.setItem("productIds",JSON.stringify(e)),c()}
