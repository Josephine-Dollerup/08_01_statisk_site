"use strict"; //Renere kode og fanger typiske fejl tidligt
console.log("index.js is connected"); // tester som det hele fungere ift tidligee fejl
const productUrl = "https://kea-alt-del.dk/t7/api/categories"; //KEA's API i en konstant variabel
const categoryList = document.querySelector(".category_list"); ///Hvor på websiden det skal indsætte de kategorier, der hentes fra API'et

getData(); // Kalder funktionen
function getData() {
  fetch(productUrl).then((result) => result.json().then((data) => showData(data)));
} // Sender en anmodning over internettet til API-adressen om at få data.
// Sikrer, at koden venter på svaret, før den prøver at bruge dataene.

function showData(data) {
  console.log("DATA", data);
  //Definerer funktionen showData, som modtager data (et array af kategorier). console.log udskriver hele arrayet i konsollen.
  //Hvorfor - Det gør det nemt at inspicere i browseren, hvilken feltnavn dine data-objekter har.

  categoryList.innerHTML = ""; //fjerner eventuel gammel tekst/test i html.
  let myInnerHTML = ""; //myInnerHTML bruges til at opsamle den nye html-kode for alle kategorierne, før vi sætter den ind på siden.
  //Hvad: Tømmer først HTML-containeren .category_list og opretter derefter en tom tekstvariabel myInnerHTML.

  data.forEach((categorie) => {
    //løber/looper igennem hver eneste kategori i dit dataset ét ad gangen.
    console.log(categorie); //indsætter navnet på den aktuelle kategori direkte i HTML-skabelonen (kaldet en template literal, som skrives med backticks
    //Det gør din side dynamisk! Uanset om API'et returnerer 5 eller 50 kategorier, opretter koden automatisk en HTML-blok for hver enkelt uden hårdkodning.
    myInnerHTML += `<div class="category_list_container">
                <a href="produktliste.html">
                    <h3>${categorie.category}</h3>
                </a>
            </div>`;
  });
  categoryList.innerHTML = myInnerHTML;
  // Hvad: Indsætter hele den samlede HTML-streng i dit DOM-element på websiden.
  // Hvorfor: Ved at opbygge hele html-strengen i variablen myInnerHTML først og kun opdatere categorylist.innerhtmlL
  // én enkelt gang til sidst, bliver websiden hurtigere og mere effektiv til at renderes af browseren.
}
