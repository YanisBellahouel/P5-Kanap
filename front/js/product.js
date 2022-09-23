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