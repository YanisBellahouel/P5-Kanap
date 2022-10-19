let addBasket = JSON.parse(localStorage.getItem("basket"));


let cart__items = document.querySelector("#cart__items");


function getBasket() {

if (addBasket === null || addBasket.lenght == 0){

console.log("le panier est vide");

}else{

    for (i = 0 ; i < addBasket.length ; i++) {
        let article = document.createElement("article");
        cart__items.appendChild(article);
        article.className = "cart__item";
    
            let newDiv = document.createElement("div");
            let img = document.createElement("img");
            newDiv.className ="cart__item__img";

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
        

        newDiv2.appendChild(newDiv3);
        newDiv2.appendChild(newDiv4);

        newDiv3.appendChild(qty);

        newDiv4.appendChild(dlt);
        
        document.getElementById("cart__items").appendChild(article);
    
        article.appendChild(newDiv);
        article.appendChild(newDiv1);
        article.appendChild(newDiv2);
    
        newDiv.appendChild(img);
        img.setAttribute('src', addBasket[i].img);
        img.setAttribute('alt', "Photographie d'un canapé");
        

        newDiv1.appendChild(description);
    
        description.appendChild(title);
        description.appendChild(color);
        description.appendChild(price);
    
    
        title.innerHTML = addBasket[i].name;
        title.style.lineHeight = "2";
        color.innerHTML = "couleur : "+ addBasket[i].color;
        price.innerHTML = "prix : "+ addBasket[i].price + "€";


        qty.innerHTML = "quantité : "+ addBasket[i].quantity;

        dlt.innerHTML = "supprimer";


    }}}
     
        
        
    

    getBasket();

  