const param = new URLSearchParams(window.location.search);
// New URLSearchParams(...) er et indbygget JavaScript-værktøj, der tager query-strengen og gør den nem at arbejde med som et objekt
//window.location.search - Returnerer den del af sidens webadresse (URL), der starter med et spørgsmålstegn ?.
// Dette kaldes en query string eller et URL-parameter.

const selectedSeasons = param.get("category");
// params.get(“category”) finder værdien til category
//.get("navn"): En metode på URLSearchParams-objektet, der udtrækker værdien for en bestemt nøgle (key)

const productURL = `https://kea-alt-del.dk/t7/api/products?category=${selectedSeasons}&limit=100`;
// Backticks (`): Bruges til at skrive en dynamisk streng (Template Literal).
// ${selectedSeasons}: Indsætter værdien af variablen selectedSeasons direkte i URL-strengen.
// Formål: URL'en sendes til et API for kun at hente produkter fra den valgte kategori, begrænset til op til 100 produkter (limit=100)
// **** hvad sker der egenlig ***///
// En bruger klikker på et link, der fører til en side med URL'en: produktliste.html?category=Apparel
// param.get("category") opfanger værdien "Apparel".
// productURL sammensættes til:"[https://kea-alt-del.dk/t7/api/products?category=Apparel&limit=100](https://kea-alt-del.dk/t7/api/products?category=Apparel&limit=100)"
// Denne adresse kan herefter bruges i f.eks. et fetch(productURL)-kald til at hente dataene

const listContainer = document.querySelector(".container"); // Henter diven men informationerne, så js, ved for agruemnterne kommer fra.

console.log("selectedSeasons", selectedSeasons);

/// fra undervisningen d. 1 okt - filtering af proukter - navne skal være lavet om så det passer til vires json og butoon navne.

let allData;
// Vi laver let fordi vi skal lave en variabel der kan ændres, og vi skal bruge den i flere funktioner.

/// **** BACK BUTTON **** ///
document.querySelector(".back_btn").addEventListener("click", (event) => {
  window.history.back();
});

/// **** FILTERING AF GENDER **** ///
const filterGenderButtons = document.querySelectorAll(".filter_gender_buttons_container div");
filterGenderButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    filterGenderButtons.forEach((button) => {
      button.classList.remove("selected");
    });
    event.target.classList.add("selected");

    if (event.target.dataset.filter === "All") {
      showProducts(allData);
    } else {
      const filter = allData.filter((product) => {
        return product.gender === event.target.dataset.filter;
      });
      showProducts(filter);
    }
  });
});
/// **** CATEGORY **** ///
const filterCategoryButtons = document.querySelectorAll(".filter_category_buttons_container div");
filterCategoryButtons.forEach((button) => {
  if (button.dataset.category === selectedSeasons) {
    button.classList.add("selected");
  }

  button.addEventListener("click", (event) => {
    window.location.href = `produktliste.html?category=${event.target.dataset.category}`;
  });
});
/// **** SORTING IFT PRISER **** ///
const sortButton = document.querySelector(".sorting_pris");
sortButton.addEventListener("click", (event) => {
  // Implementation for sorting products
  const sortedData = allData.sort((a, b) => {
    // Her laver vi en konstant om at der skal sorteres efter pris i stigende rækkefølge
    const aktualPriceA = a.discount ? getDiscountPrice(a.price, a.discount) : a.price;
    const aktualPriceB = b.discount ? getDiscountPrice(b.price, b.discount) : b.price;
    // Har a og b discount, hvis mig discount, hvis ikke vis mig bare den oprindelig pris.

    return aktualPriceA - aktualPriceB;
    // Sorter efter pris i stigende rækkefølge - a skal være negativt ift b og derfor skal a komme før b.
  });
  showProducts(sortedData);
});

// ******* OPRET FETCH ******* //
function getData(url) {
  fetch(url).then((response) => {
    response.json().then((data) => {
      allData = data;
      showProducts(allData); // bliver vist i html
      //console.log("data", data);  - gør det bliver vist i konsollen
    });
  });
}

// **** Hvad sker der under fetch **** //
// Når du henter data med fetch(), bruges .then() til at vente på det asynkrone svar fra serveren uden at fryse programmet.
// Den første .then() modtager et response-objekt med det rå svar og konverterer det fra JSON til et JavaScript-objekt,
// via response.json().
// I den næste .then() modtages de færdige data, som du derefter kan bruge i din kode.

/// **** DYNAMISK INDHOLD **** ///

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
        <a href="detailview.html?id=${product.id}">Læs mere</a>
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
