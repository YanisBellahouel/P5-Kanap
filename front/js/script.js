// récupération des produits de l'api
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())

  .then((result) => {
    products(result);
   
  })
  .catch((error) => alert("erreur" + error));

function products(result) {
  for (let kanap in result) {
    //afficher les produits
    let btn = document.createElement("a");
    btn.setAttribute("href", "./product.html?id=" + result[kanap]._id);
    let article = document.createElement("article");
    let img = document.createElement("img");
    img.setAttribute("src", result[kanap].imageUrl);
    let name = document.createElement("h3");
    name.textContent = result[kanap].name;
    let description = document.createElement("p");
    description.textContent = result[kanap].description;

    let items = document.getElementById("items");
    items.appendChild(btn);

    btn.appendChild(article);

    article.appendChild(img);
    article.appendChild(name);
    article.appendChild(description);

    name.classList.add("productName");
    description.classList.add("productDescription");
  }
}
