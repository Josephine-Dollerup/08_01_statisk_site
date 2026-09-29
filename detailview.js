const param = new URLSearchParams(window.location.search);
const selectedId = param.get("id");

console.log("selectedId", selectedId);

const detailURL = `https://kea-alt-del.dk/t7/api/products/${selectedId}`;
console.log("detailURL", detailURL);

const product_info = document.querySelector(".product_view");

function loadData(url) {
  fetch(url).then((response) => {
    response.json().then((data) => {
      showDetails(data);
    });
  });
}

function showDetails(detail) {
  console.log("detail", detail);
  product_info.innerHTML = "";

  product_info.innerHTML += `

  <div class="detail_img">
    <img src="https://kea-alt-del.dk/t7/images/webp/640/${detail.id}.webp" alt="billed" />   
  </div>
  <div class="product_info">
    <h3>${detail.productdisplayname}</h3>
    <p>${detail.brandname} - ${detail.category}</p>
    <p>Produkt: ${detail.articletype}</p>
    <p>${detail.price} kr.</p>
    
    <p> Color: ${detail.basecolour}</p>
  </div>

            <div class="product_specifications">
               <h3>Produkt specifikationer</h3>
               <p>Agegroup: ${detail.agegroup} </p>
                <p>Season: ${detail.season}</p>
                 <p>Gender: ${detail.gender} </p>
            </div>
            `;
  // document.querySelector(".detail_img img").src = `https://kea-alt-del.dk/t7/images/webp/640/${detail.id}.webp`;
  // document.querySelector(".detail_model").innerHTML = detail.productdisplayname;

  // <div>${detail.discount ? "<p>" + getDiscountPrice(detail.price, detail.discount) + "kr</p>" : ""}
  //   <p>${detail.price} kr ${detail.discount ? "-" + detail.discount + "%" : ""}</p>
  // <div>
}

loadData(detailURL);
