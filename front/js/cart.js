//récupération du localstorage
let addBasket = JSON.parse(localStorage.getItem("basket"));

let cart__items = document.querySelector("#cart__items");

//afficher le ou les produits
function getBasket() {
  var priceProduct;
  if (addBasket === null || addBasket.length == 0) {
    let p = document.createElement("p");
    cart__items.appendChild(p);
    p.innerHTML = "votre panier est vide";
  } else {
    // disposition des éléments
    for (i = 0; i < addBasket.length; i++) {

     

      fetch("http://localhost:3000/api/products/" + addBasket[i].id)
      .then((response) => response.json())
      .then((Product) => {
       priceProduct = Product.price;
       console.log(priceProduct);
      });
      console.log(priceProduct);
      
      let article = document.createElement("article");
      cart__items.appendChild(article);
      article.className = "cart__item";
      article.dataset.id = addBasket[i].id;
      article.dataset.color = addBasket[i].color;

      let divImg = document.createElement("div");
      let img = document.createElement("img");
      divImg.className = "cart__item__img";

      let newDiv1 = document.createElement("div");
      newDiv1.className = "cart__item__content";

      let description = document.createElement("div");
      description.className = "cart__item__content__titlePrice";
      let title = document.createElement("h2");
      let color = document.createElement("p");
      let price = document.createElement("p");

      let newDiv2 = document.createElement("div");
      newDiv2.className = "cart__item__content__settings";

      let newDiv3 = document.createElement("div");
      newDiv3.className = "cart__item__content__settings__quantity";
      let qty = document.createElement("p");

      let newDiv4 = document.createElement("div");
      newDiv4.className = "cart__item__content__settings__delete";
      let dlt = document.createElement("p");
      let productQuantity = document.createElement("input");

      newDiv2.appendChild(newDiv3);
      newDiv2.appendChild(newDiv4);

      newDiv3.appendChild(qty);
      newDiv3.appendChild(productQuantity);

      newDiv4.appendChild(dlt);

      document.getElementById("cart__items").appendChild(article);

      article.appendChild(divImg);
      article.appendChild(newDiv1);
      article.appendChild(newDiv2);

      divImg.appendChild(img);
      img.setAttribute("src", addBasket[i].img);
      img.setAttribute("alt", "Photographie d'un canapé");

      newDiv1.appendChild(description);

      description.appendChild(title);
      description.appendChild(color);
      description.appendChild(price);

      title.innerHTML = addBasket[i].name;
      color.innerHTML = "couleur : " + addBasket[i].color;
      price.innerHTML = "prix : " + priceProduct + "€aaa";

      qty.innerHTML = "quantité : ";

      productQuantity.value = addBasket[i].quantity;
      productQuantity.className = "itemQuantity";
      productQuantity.setAttribute("type", "number");
      productQuantity.setAttribute("min", "1");
      productQuantity.setAttribute("max", "100");
      productQuantity.setAttribute("name", "itemQuantity");

      dlt.innerHTML = "supprimer";
      dlt.className = "deleteItem";
    }
  }
}
getBasket();

// fonction pour le total du prix et de la quantité
function getTotals() {
  let elQty = document.getElementsByClassName("itemQuantity");
  let myLength = elQty.length,
    totalQty = 0;

  for (let i = 0; i < myLength; ++i) {
    totalQty += elQty[i].valueAsNumber;
  }

  let productTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.innerHTML = totalQty;
  totalPrice = 0;

  for (let i = 0; i < myLength; ++i) {
    totalPrice += elQty[i].valueAsNumber * addBasket[i].price;
  }

  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.innerHTML = totalPrice;
}
getTotals();

// fonction pour supprimer un produit
function delProduct() {
  let delItem = document.querySelectorAll(".deleteItem");

  for (let i = 0; i < delItem.length; i++) {
    delItem[i].addEventListener("click", function (event) {
      let articleDelItemID = event.target
        .closest("article")
        .getAttribute("data-id");
      let articleDelItemColor = event.target
        .closest("article")
        .getAttribute("data-color");

      productToDel = addBasket.find(
        (product) =>
          product.id !== articleDelItemID &&
          product.color !== articleDelItemColor
      );

      newAddbasket = addBasket.filter(
        (product) =>
          product.id !== articleDelItemID ||
          product.color !== articleDelItemColor
      );



      localStorage.setItem("basket", JSON.stringify(newAddbasket));

      location.reload();
    });
  }
}
delProduct();

// fonction pour changer la quantité
function changeQty() {
  let itemQty = document.querySelectorAll(".itemQuantity");
  for (let i = 0; i < itemQty.length; i++) {
    itemQty[i].addEventListener("change", (event) => {
      event.preventDefault();

      let newItemQty = itemQty[i].value;

      const newAddBasket = {
        id: addBasket[i].id,
        img: addBasket[i].img,
        alt: addBasket[i].alt,
        name: addBasket[i].name,
        color: addBasket[i].color,
        price: addBasket[i].price,
        quantity: parseInt(newItemQty),
      };

      addBasket[i] = newAddBasket;
      localStorage.setItem("basket", JSON.stringify(addBasket));

      getTotals();
    });
  }
}
changeQty();

let form = document.querySelector(".cart__order__form");

// création des éxpréssion régulières
let nameRegExp = new RegExp("[a-zA-Z-]+");
let adressRegExp = new RegExp("[a-zA-Z0-9.-_]");
let emailRegExp = new RegExp(
  "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
);

// vérification du formulaire

form.firstName.addEventListener("blur", function (e) {
  checkFirstname(e.target.value);
});

// vérifie le firstname
function checkFirstname(data){
  if (nameRegExp.test(data)) {
    return true;
  }  

  let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
  firstNameErrorMsg.innerHTML = "veuillez vérifier votre prénom.";

  return false;
}

form.lastName.addEventListener("blur", function (e) {
  checkLastname(e.target.value);
});

// vérifie le lastname
function checkLastname(data){
  if (nameRegExp.test(data)) {
    return true;
  }  

  let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
  lastNameErrorMsg.innerHTML = "veuillez vérifier votre nom.";

  return false;
}

form.address.addEventListener("blur", function (e) {
  checkAddress(e.target.value);
});

// vérifie l'addresse
function checkAddress(data){
  if (nameRegExp.test(data)) {
    return true;
  }  

  let addressErrorMsg = document.querySelector("#addressErrorMsg");
  addressErrorMsg.innerHTML = "veuillez vérifier votre adresse.";

  return false;
}


form.city.addEventListener("blur", function (e) {
  checkCity(e.target.value);
});

// vérifie la ville
function checkCity(data){
  if (nameRegExp.test(data)) {
    return true;
  }  

  let cityErrorMsg = document.querySelector("#cityErrorMsg");
  cityErrorMsg.innerHTML = "veuillez vérifier votre ville.";

  return false;
}

form.email.addEventListener("blur", function (e) {
  checkEmail(e.target.value);
});

// vérifie l'email
function checkEmail(data){
  if (emailRegExp.test(data)) {
    return true;
  }  

  let emailErrorMsg = document.querySelector("#emailErrorMsg");
  emailErrorMsg.innerHTML = "veuillez vérifier votre email.";

  return false;
}



//fonction pour confirmer la commande

function getOrder() {
  let order = document.querySelector("#order");

  order.addEventListener("click", function (e) {
    e.preventDefault();

    let inputFirstName = document.getElementById("firstName").value;
    let inputLastName = document.getElementById("lastName").value;
    let inputAddress = document.getElementById("address").value;
    let inputCity = document.getElementById("city").value;
    let inputEmail = document.getElementById("email").value;

    if (addBasket == null) {
      alert("veuillez ajouter des produits dans votre panier");
      e.preventDefault();
      // test regex 
    } else if (
      checkFirstname(inputFirstName) === false ||
      checkLastname(inputLastName) === false ||
      checkAddress(inputAddress) === false ||
      checkCity(inputCity) === false ||
      checkEmail(inputEmail) === false
    ) {
      alert("Vérifiez vos coordonnées pour passer la commande !");
      e.preventDefault(); 
      // création du contact
    } else {
      let contact = {
        firstName: inputFirstName,
        lastName: inputLastName,
        address: inputAddress,
        city: inputCity,
        email: inputEmail,
      };

      let productIDs = [];
      for (let i = 0; i < addBasket.length; i++) {
        productIDs.push(addBasket[i].id);
      }
// on sauvegarde le contact
      localStorage.setItem("contact", JSON.stringify(contact));
// on rassemble les produits et le contact
      let requestData = {
        contact: contact,
        products: productIDs,
      };
//requete post de requestData
      const post = {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
        },
      };
// on envoie l'utilisateur sur la page confirmation 
      fetch("http://localhost:3000/api/products/order", post)
        .then((response) => response.json())
        .then((data) => {
          
          localStorage.setItem("orderId", data.orderId);

          document.location.href = "confirmation.html?id=" + data.orderId;
        });
    }
  });
}
getOrder();
