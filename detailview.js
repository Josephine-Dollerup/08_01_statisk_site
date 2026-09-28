const param = new URLSearchParams(window.location.search);
const selectedId = param.get("id");

console.log("selectedId", selectedId);

const detailURL = `https://kea-alt-del.dk/t7/api/products/${selectedId}`;
console.log("detailURL", detailURL);

function loadData(url) {
  fetch(url).then((response) => {
    response.json().then((data) => {
      showDetail(data);
    });
  });
}

function showDetail(detail) {
  console.log("detail", detail);
  document.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${detail.id}.webp`;
}

loadData(detailURL);
