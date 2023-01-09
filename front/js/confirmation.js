//Récupération du numéro de commande dans l'URL
let str = window.location.href;
let url = new URL(str);
let idURL = url.searchParams.get("id");

let orderId = document.getElementById("orderId");
orderId.innerHTML = idURL;

localStorage.clear();
