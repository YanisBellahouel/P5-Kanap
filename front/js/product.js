// nouvelle url + id
const idProduct = new URL(window.location.href).searchParams.get("id");

// création des éléments
let imgProduct = document.querySelector(".item__img");
let img = document.createElement("img");
imgProduct.appendChild(img);

let titleProduct = document.getElementById("title");
let priceProduct = document.getElementById("price");
let descriptionProduct = document.getElementById("description");
let colorsProduct = document.getElementById("colors");

const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

// récupération des paramétres du produit
fetch("http://localhost:3000/api/products/" + idProduct)
  .then((response) => response.json())
  .then((product) => {
    img.setAttribute("src", product.imageUrl);
    img.setAttribute("alt", product.altTxt);
    titleProduct.textContent = product.name;
    priceProduct.textContent = product.price;
    descriptionProduct.textContent = product.description;
    for (i = 0; i < product.colors.length; i += 1) {
      document.querySelector(
        "#colors"
      ).innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
    }
  });
//fonction pour sauvegarder le localstorage
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}
// on met les produits dans un tableau
function getBasket() {
  let basket = localStorage.getItem("basket");
  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}

//fonction pour ajouter le produit
function addBasket(product) {
  //les paramétres du produit
  const selection = {
    id: idProduct,
    img: img.src,
    alt: img.alt,
    name: titleProduct.textContent,
    price: priceProduct.textContent,
    color: colorPicked.value,
    quantity: parseInt(quantityPicked.value),
  };

  // si le produit est de nouveau ajouter on rajoute la quantité souhaité
  let basket = getBasket();
  let findProduct = basket.find(
    (p) => p.id == idProduct && p.color == colorPicked.value
  );
  if (findProduct != undefined) {
    findProduct.quantity = findProduct.quantity + selection.quantity;
  } else {
    quantity;
    basket.push(selection);
  }
  saveBasket(basket);
}

// la fonction est activé au clic et on vérifie la couleur et la quantité
document.querySelector("#addToCart").addEventListener(
  "click",
  function (event) {
    event.preventDefault();
    if (colorPicked.value === "" || parseInt(quantityPicked.value) <= 0 || parseInt(quantityPicked.value) > 100) {
      alert("veuillez choisir une quantité et une couleur");
    } else {
      addBasket();
    }
  },
  false
);
