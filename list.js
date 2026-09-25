const productURL = "https://kea-alt-del.dk/t7/api/products";
const listContainer = document.querySelector(".container"); // Henter diven men informationerne, så js, ved for agruemnterne kommer fra.

// Opret functionen
function getData(url) {
  fetch(url).then((response) => {
    response.json().then((data) => {
      showProducts(data); // bliver vist i html
      //   console.log("data", data); - gør det bliver vist i konsollen
    });
  });
}

// Hvad sker der under fetch
// Når du henter data med fetch(), bruges .then() til at vente på det asynkrone svar fra serveren uden at fryse programmet.
// Den første .then() modtager et response-objekt med det rå svar og konverterer det fra JSON til et JavaScript-objekt,
// via response.json().
// I den næste .then() modtages de færdige data, som du derefter kan bruge i din kode.

function showProducts(products) {
  console.log("First product", products[0]);
  console.log("Number of products", products.length);

  listContainer.innerHTML = "";

  products.forEach((product) => {
    listContainer.innerHTML += `<article class="product ${product.soldout ? "soldout" : ""}"> 
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="billed" />          
        <h3>${product.productdisplayname}</h3>
        <p>${product.brandname} - ${product.category}</p>
        <p>${product.price}</p>
        <p class="soldout_tag">Sold Out</p>
        <a href="produkt.html">Læs mere</a>
    </article>`;
  });
  //   Vi skriver "products", fordi det flere produkter, men når vi laver forEach, skal vi skrive "product" for vi skal have fat i et produkt
}
// Kalder functionen
getData(productURL);
