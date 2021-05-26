

// Récupération des produits sur l'API
fetch('http://localhost:3000/api/teddies')
.then(response => response.json())
.then(function(products) {
  return products
})
.catch(function(error) {
  alert(error)
})
.then(products => {
  const allProducts = document.querySelector('#allProducts'); // Retourne le premier élement dans le document correspondant au sélecteur
  for(let i = 0; i < products.length; i++) {   // BOUCLE FOR, PARCOURIR LE TABLEAU
    allProducts.innerHTML += `
    <div class="products">
      <div class="product">${products[i].name}</div>
      <img class="image" src="${products[i].imageUrl}">
      <a class="ajout-panier panier" href="#">Ajouter au panier</a>
      <div class="price">${products[i].price/100} €</div>
      <button class="custom-btn"><a href="produits.html?id=${products[i]._id}">Voir Produit</a> </button>
    </div>` ;
  }

  let carts = document.querySelectorAll(".ajout-panier");

  for (let i=0; i < carts.length; i++) {
        carts[i].addEventListener("click", () => {
            cartNumbers(products[i]);
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
     
      productNumbers = parseInt(productNumbers);

      if(productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector(".nav-item span").textContent = productNumbers + 1;

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
        
      if(cartItems[products.tag] == undefined) {
        cartItems = {
          ...cartItems,
          [products.tag]: products
        }
      }
      cartItems[products.tag].inCart += 1;
  
    } else {
      products.inCart = 1;
      cartItems = {
          [products.tag]: products
      }
    }
    
    
    localStorage.setItem("productsInCart", JSON.stringify
    (cartItems));
  
  }
  
  
  onLoadCartsNumbers();
});
