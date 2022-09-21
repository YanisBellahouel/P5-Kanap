function basket (){

    let products = [];

    if (localStorage.getItem("basket") != null){ 

        products = JSON.parse(localStorage.getItem("basket"));
        return products

    } else {

        return products;
    }

}

let newDiv = document.createElement("div");
let img = document.createElement("img");

let newDiv1 = document.createElement("div");
let newDiv2 = document.createElement("div");

