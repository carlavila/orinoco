

                                                               // PANIER


// AJOUTER LES PRODUITS DANS LE PANIER

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

    let productNumbers = localStorage.getItem("cartNumbers"); //La méthode getItem() renvoie la valeur de l'élément d'objet de stockage spécifié.
   
    productNumbers = parseInt(productNumbers); // analyse une chaîne de caractère fournie en argument et renvoie un entier exprimé dans une base donnée

    if(productNumbers) {
      localStorage.setItem("cartNumbers", productNumbers + 1); //  lorsque lui sont passées le duo clé-valeur, les ajoute à l'emplacement de stockage, sinon elle met à jour la valeur si la clé existe déjà.
      document.querySelector(".nav-item span").textContent = productNumbers + 1; // retourne le premier Element dans le document correspondant au sélecteur - ou groupe de sélecteurs - spécifié(s), ou null si aucune correspondance n'est trouvée.

    } else {
      localStorage.setItem("cartNumbers", 1);
      document.querySelector(".nav-item span").textContent = 1;
    }   
    setItems(products); // La méthode setItem() définit la valeur de l'élément d'objet de stockage spécifié.
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


// CALCULER LE TOTAL DES PRODUITS QU'ON AJOUTE AU PANIER 

function totalCost(products){
// console.log("The product price is", products.price/100)
let cartCost = localStorage.getItem("totalCost")
//console.log("My cartCost is", cartCost);
//console.log(typeof cartCost);
if(cartCost != null) {
    cartCost = parseInt (cartCost); // Convertir string en Number
    localStorage.setItem("totalCost", cartCost + products.price/100);
} else {
    localStorage.setItem("totalCost", products.price/100)
}
}

// FAIRE APPARAITRE LES PRODUITS DANS LE PANIER

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart")
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector
  (".selected-products");
  let cartCost = localStorage.getItem("totalCost")

  if(cartItems && productContainer) {
      productContainer.innerHTML = '';
      Object.values(cartItems).map(products => {
          productContainer.innerHTML += `
          <div class="product">
              <img class="image" src="${products.imageUrl}">
              <div class="price">${products.price/100},00 €</div>
              <div class="quantity">
                 <span>${products.inCart}</span>
              </div>
              <div class="color">${products.colors}</div>
              <div class="total">
                  ${products.inCart * products.price/100},00 €
              </div>
          </div>
          <div class="text-center">
          <button id="vider_panier" class="vider_panier" type="button" onclick="viderPanier()">Vider le panier</button>
          `;
      });

      productContainer.innerHTML += `
        <div class="teddiesTotalContainer">
            <h4 class="teddiesTotalTitle">
                PRIX TOTAL :
            </h4>
            <h4 class="teddiesTotal">
                 ${cartCost},00 €
            </h4>
      `
}
}

// LORSQUE LE PANIER EST VIDE

let panier = JSON.parse(localStorage.getItem("panier"));

//Condition pour afficher le panier
if (panier) {
  ligneTableau();
} else {
  tableauVide();
}

//Boucle importation 
function ligneTableau() {
  panier.forEach(function(result, index) {infosHTML(result, index);});
  totalPanier();
  cartNumber();
}

function tableauVide() { // Fonction pour tableau vide (pas d'article)
  document.getElementById("panier_vide").innerHTML += `
    <div class="message">
      <h3 class="message_vide">Votre panier est vide...</h3>
    </div>`
  ;
  document.getElementById("vider_panier").style.display = "none";
}


// VIDER LE PANIER ET LE LOCALSTORAGE LORSQU'ON CLIQUE SUR LE BOUTTON 
function viderPanier() {
  localStorage.clear();
  location.reload();
}

onLoadCartsNumbers();
displayCart();



                                                                // FORMULAIRE



//Evènement pour vérifier le champ mail en enlevant le focus (le focus permet de le selectionner directement au chargement de la page,il permet à l'utilisateur de saisir directement du texte sans devoir cliquer auparavant sur le champ. )
document.querySelector("#mail").addEventListener("blur", function() { //retire le focus de l'élément
  const mail = document.querySelector("#mail").value;
  const regexEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; //Utilisation de regex pour vérifier les caractères
  if (!regexEmail.test(mail)) {
    document.querySelector("#erreur_mail").textContent =
      "email non conforme";
  }
});

//Evenement pour vérifier le champ du code postal en enlevant le focus
document.querySelector("#postalcode").addEventListener("blur", function() {
  const postalCode = document.querySelector("#postalcode").value;
  const regexEmail = /[0-9]{5}/; //Utilisation de regex pour vérifier les caractères
  if (!regexEmail.test(postalCode)) {
    document.querySelector("#erreur_code").textContent =
      "Code postal non valide";
  }
});


//Evènement pour vérifier le champ adresse en enlevant le focus 
document.querySelector("#adress").addEventListener("blur", function() { //retire le focus de l'élément
  const adress = document.querySelector("#adress").value;
  const regexAdress = /[0-9]{5}/ ; //Utilisation de regex pour vérifier les caractères
  if (!regexAdress.test(adress)) {
    document.querySelector("#erreur_adress").textContent =
      "adresse non conforme";
  }
});


