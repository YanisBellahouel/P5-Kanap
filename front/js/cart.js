function basket (){

    let products = [];

    if (localStorage.getItem("basket") != null){ 

        products = JSON.parse(localStorage.getItem("basket"));
        return products

    } else {

        return products;
    }

}

let article = document.createElement("article");

let newDiv = document.createElement("div");
let img = document.createElement("img");

let newDiv1 = document.createElement("div");
let description = document.createElement("div");
let title = document.createElement("h2");
let color = document.createElement("p");
let price = document.createElement("p");

document.getElementById("cart__items").appendChild(article);

article.appendChild(newDiv);
article.appendChild(newDiv1);

newDiv.appendChild(img);

newDiv1.appendChild(description);

description.appendChild(title);
description.appendChild(color);
description.appendChild(price);

article.setAttribute("panier", [basket]);



title.textContent = Selection.name;
color.textContent = Selection.color;
price.textContent = Selection.price;
