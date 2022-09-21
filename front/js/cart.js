function basket (){

    let products = [];

    if (localStorage.getItem("basket") != null){ 

        products = JSON.parse(localStorage.getItem("basket"));
        return products

    } else {

        return products;
    }

}


