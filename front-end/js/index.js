

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
  const allProducts = document.querySelector('#allProducts');
  for(let i = 0; i < products.length; i++){
    allProducts.innerHTML += `
    <div class="products">
      <div class="product">${products[i].name}</div>
      <img class="image" src="${products[i].imageUrl}">
      <div class="price">${products[i].price/100} €</div>
      <button class="custom-btn"><a href="produits.html?id=${products[i]._id}">Voir Produit</a> </button>
    </div>` ;
  }


});


