const productURL = "https://kea-alt-del.dk/t7/api/products";
const listContainer = document.querySelector(".container"); // Henter diven men informationerne, så js, ved for agruemnterne kommer fra.

const param = new URLSearchParams(window.location.search);
const selectedSeasons = param.get("season");
console.log("selectedSeasons", selectedSeasons);

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
       <div>
          ${product.discount ? "<p>" + getDiscountPrice(product.price, product.discount) + "kr</p>" : ""}
          <p>${product.price} kr ${product.discount ? "-" + product.discount + "%" : ""}</p>
         <div>
        <p class="soldout_tag">Sold Out</p>
        <a href="produkt.html">Læs mere</a>
    </article>`;
  });
  //   Vi skriver "products", fordi det flere produkter, men når vi laver forEach, skal vi skrive "product" for vi skal have fat i et produkt
}
// Kalder functioner:
// fetchen kaldes
getData(productURL);

// Her neder har vi lavet en funktion, hvor vi kalder den oppe i diven.
// Functionen er lavet til hvordan vi skal regne vores discount ud.
function getDiscountPrice(orgianlPrice, discount) {
  return Math.round(orgianlPrice * (100 - discount)) / 100;
}

// Den øverste linje i diven, gør at den regner den samlede nye pris ud. Neden under står "udregningen", som viser hvor meget rabat der på.
// <p-taget i diven, lavet vi en if/else. Her siger vi at hvis en af produkterne har api'en, discount skal der komme et - (bindestreg), samt et %, som viser hvor meget procenten er på
// hvis ikke, så hopper den baggeret i koden og så siger den der ikke skal ske noget.
