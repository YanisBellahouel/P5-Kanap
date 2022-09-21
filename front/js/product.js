const idProduct = new URL(window.location.href).searchParams.get("id");


let imgProduct = document.querySelector(".item__img");
let img = document.createElement("img");
imgProduct.appendChild(img);

let titleProduct = document.getElementById("title");
let priceProduct = document.getElementById("price");
let descriptionProduct = document.getElementById("description");
let colorsProduct = document.getElementById("colors");
let imageProduct = document.getElementById("imageUrl");;
let altProduct = document.getElementById("altTxt");;

const colorPicked = document. querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");



fetch("http://localhost:3000/api/products/" + idProduct)
    .then((response) => response.json())    
    .then((product) => {
        img.setAttribute("src", product.imageUrl);
        img.setAttribute("alt", product.altTxt);   
        titleProduct.textContent = product.name ;
        priceProduct.textContent = product.price ;
        descriptionProduct.textContent = product.description;

        colorsProduct.querySelector = ('select');
        colorsProduct[0] = new Option("--SVP, choisissez une couleur --","",true,true);
        product.colors.forEach(function(element,key) {
            colorsProduct[key+1] = new Option(element,key);
        });
        
        
    })



    function saveBasket(basket) {
      localStorage.setItem("basket", JSON.stringify(basket));
  }
  
  function getBasket(){
      let basket = localStorage.getItem("basket");
      if (basket == null){
          return [];
      } else {
          return JSON.parse(basket);
      }
  
  }
  
  function addBasket(product){
    
  const selection = {
      id: idProduct,
      img: imageProduct,
      alt: altProduct,
      name: titleProduct.textContent,
      price: priceProduct.textContent,
      color: colorPicked.value,
      quantity: quantityPicked.value,
    };


      let basket = getBasket();
      let findProduct = basket.find(p => p.id == idProduct && p.color == colorPicked.value);
      if (findProduct !=undefined){
          findProduct.quantity++;
      } else {
          quantity;
          basket.push(selection);
      }
      saveBasket(basket);
  }
   

  document.querySelector("#addToCart").addEventListener("click", function(event) {
  event.preventDefault();
  addBasket();
  }, false);


//     function addProduct() {

//  let productLocalStorage =  JSON.parse(localStorage.getItem('product'));
 


//   productLocalStorage.push (selection);

//   localStorage.setItem('product', JSON.stringify(productInLocalStorage));

//   }
    
//     const addToCart = document.getElementById('addToCart');
// addToCart.addEventListener('click', (event) => {

//   addProduct();


//   })
    
 



  // productLocalStorage.forEach (function (product, key) {
  //   if (product.id == idProduct && product.color == colorPicked.value) {
  //     productLocalStorage[key].quantity = product.quantity + quantityPicked.value;
  //     localStorage.setItem('product', JSON.stringify(productLocalStorage));
  //     addProduct();

  //   } else {
  //     productLocalStorage = [];
  //     addProduct ();
  //   }
  // })










/*
// je crée une nouvelle url à partir de l'url actuelle 
// et en ajoutant searchParams pour manipuler les paramètres de requête d'URL :
let params = new URL(window.location.href).searchParams;
// j'indique que la nouvelle url sera ajoutée d'un id :
let newID = params.get('id');

//---------J'APPELLE DE NOUVEAU L'API AVEC L'ID DU CANAPE CHOISI---------

// je crée les variables dont j'ai besoin pour manipuler cette page :
const image = document.getElementsByClassName('item__img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');

let imageURL = "";
let imageAlt = "";

// je crée la bonne URL pour chaque produit choisi en ajoutant newID
fetch("http://localhost:3000/api/products/" + newID)
  .then(res => res.json())
  .then(data => {
    // je modifie le contenu de chaque variable avec les bonnes données :
    image[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    imageURL = data.imageUrl;
    imageAlt = data.altTxt;
    title.innerHTML = `<h1>${data.name}</h1>`;
    price.innerText = `${data.price}`;
    description.innerText = `${data.description}`;

    // je configure le choix des couleurs 
    for (number in data.colors) {
      colors.options[colors.options.length] = new Option(
        data.colors[number],
        data.colors[number]
      );
    }
  })
   

    
    
const selectQuantity = document.getElementById('quantity');
const selectColors = document.getElementById('colors');

// je configure un eventListener quand l'utilisateur clique sur ajouter au panier
const addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click', (event) => {
  event.preventDefault();

  const selection = {
    id: newID,
    image: imageURL,
    alt: imageAlt,
    name: title.textContent,
    price: price.textContent,
    color: selectColors.value,
    quantity: selectQuantity.value,
  };

  // je déclare une variable productInLocalStorage 
  // dans laquelle je mets les clés+valeurs dans le local storage
  // JSON.parse permet de convertir les données au format JSON en objet JavaScript
  let productInLocalStorage =  JSON.parse(localStorage.getItem('product'));

  // j'ajoute les produits sélectionnés dans le localStorage
  const addProductLocalStorage = () => {
  // je récupère la sélection de l'utilisateur dans le tableau de l'objet :
  // on peut voir dans la console qu'il y a les données,
  // mais pas encore stockées dans le storage à ce stade

  productInLocalStorage.push(selection);
  // je stocke les données récupérées dans le localStorage :
  // JSON.stringify permet de convertir les données au format JavaScript en JSON 
  // vérifier que key et value dans l'inspecteur contiennent bien des données
  localStorage.setItem('product', JSON.stringify(productInLocalStorage));
  }

  // je crée une boîte de dialogue pour confirmer l'ajout au panier
  let addConfirm = () => {
    alert('Le produit a bien été ajouté au panier');
  }

  let update = false;
  
  // s'il y a des produits enregistrés dans le localStorage
  if (productInLocalStorage) {
  // verifier que le produit ne soit pas deja dans le localstorage/panier
  // avec la couleur
   productInLocalStorage.forEach (function (productOk, key) {
    if (productOk.id == newID && productOk.color == selectColors.value) {
      productInLocalStorage[key].quantity = parseInt(productOk.quantity) + parseInt(selectQuantity.value);
      localStorage.setItem('product', JSON.stringify(productInLocalStorage));
      update = true;
      addConfirm();
    }
  });

  //
    if (!update) {
    addProductLocalStorage();
    addConfirm();
    }
  }

  // s'il n'y a aucun produit enregistré dans le localStorage 
  else {
    // je crée alors un tableau avec les éléments choisi par l'utilisateur
    productInLocalStorage = [];
    addProductLocalStorage();
    addConfirm();
  }
});

*/