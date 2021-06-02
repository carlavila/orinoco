

let carts = document.querySelectorAll(".ajout-panier");

for (let i=0; i < carts.length; i++) {
      carts[i].addEventListener("click", () => {
          cartNumbers(products[i]);
          totalCost(products[i])
      })
}
  
function onLoadCartsNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if(productNumbers) {
    document.querySelector(".nav-item span").textContent = productNumbers;
  }
}


function cartNumbers(products) {

    let productNumbers = localStorage.getItem("cartNumbers");
   
    productNumbers = parseInt(productNumbers); // analyse une chaîne de caractère fournie en argument et renvoie un entier exprimé dans une base donnée

    if(productNumbers) {
      localStorage.setItem("cartNumbers", productNumbers + 1); //  lorsque lui sont passées le duo clé-valeur, les ajoute à l'emplacement de stockage, sinon elle met à jour la valeur si la clé existe déjà.
      document.querySelector(".nav-item span").textContent = productNumbers + 1; // retourne le premier Element dans le document correspondant au sélecteur - ou groupe de sélecteurs - spécifié(s), ou null si aucune correspondance n'est trouvée.

    } else {
      localStorage.setItem("cartNumbers", 1);
      document.querySelector(".nav-item span").textContent = 1;
    }   

    setItems(products);
}

function setItems(products){
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  

  if(cartItems != null) {
      
    if(cartItems[products._id] == undefined) {
      cartItems = {
        ...cartItems,
        [products._id]: products
      }

      cartItems[products._id].inCart = 0;

    }
    
    cartItems[products._id].inCart += 1;

  } else {
    products.inCart = 1;
    cartItems = {
        [products._id]: products
    }
  }
  
  
  localStorage.setItem("productsInCart", JSON.stringify
  (cartItems));

}


// Calculer le total des produits qu'on ajoute au panier

function totalCost(products){
// console.log("The product price is", products.price/100)
let cartCost = localStorage.getItem("totalCost")

console.log("My cartCost is", cartCost);
console.log(typeof cartCost);

if(cartCost != null) {
    cartCost = parseInt (cartCost); // Convertir string en Number
    localStorage.setItem("totalCost", cartCost + products.price/100);
} else {
    localStorage.setItem("totalCost", products.price/100)
}

}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
  
    console.log(cartItems);
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(products => {
            productContainer.innerHTML += `
            <div class="product">
                <img class="image" src="${products.imageUrl}">
                <span>${products.name}</span>
            </div>
            <div class="price">${products.price/100} €</div>
            `;
        
        });
  }


}


onLoadCartsNumbers();
displayCart();