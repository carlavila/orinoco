
//Récupère lien get
let link = location.href;


//récupère id
let teddyId = link.split('=')[1]; //  liste ordonnée de sous-chaînes, place ces sous-chaînes dans un tableau et retourne le tableau.

let element = {};


//affichage du produit

fetch('http://localhost:3000/api/teddies')
.then(response => response.json())
.then(teddyProduct => {
  const product = document.querySelector('#product');

  for(let i =0; i < teddyProduct.length; i++){
    if(teddyProduct[i]._id == teddyId){
      element._id = teddyProduct[i]._id;
      element.name = teddyProduct[i].name;
      element.price = teddyProduct[i].price / 100;
      element.url = teddyProduct[i].imageUrl;
      product.innerHTML += `<form class="teddyProduct">
      <div class="productName">${teddyProduct[i].name}</div>
        <article class="Img">
            <img class="productImage" src="${teddyProduct[i].imageUrl}">
        </article>
        <aside class="Informations">
            <div class="productDescription"><h2>Description : </h2>${teddyProduct[i].description}</div>
            <div class="productColors"><h2>Couleurs : </h2>
            <div class="error"></div>
            ${colors(teddyProduct[i].colors)} </div>
            <div class="productPrice"><h2>Prix : </h2>${teddyProduct[i].price/100} €</div>
            <div class="allBtn">
            <button class="btn"><a href="./index.html">Retour</a></button>
            <button class="btn" id="panier"><a href="./panier.html">Ajouter au panier</a></button>
          </aside>
      </form>` ;

    }
  }


  // Récupération des éléments du DOM
  const choix = document.querySelectorAll('.choix');
  const panier = document.querySelector('#panier');
  const modal = document.querySelector('#modal');


  let validChoix = "";

  // Evenement choix couleurs
  for(let i = 0; i < choix.length;i++){
    choix[i].addEventListener("click", ()=>{
      validChoix = choix[i].value;
    });
  };


  // Evenement click sur ajouter au panier
  panier.addEventListener("click", (e)=>{
  e.preventDefault();

    if(validChoix == ""){
      const error = document.querySelector('.error');
      error.innerHTML = "Veuillez sélectionner une couleur";
    } else{



      // Récupération du tableau dans le localStorage
      let teddy = JSON.parse(localStorage.getItem("teddy"));  /*La méthode analyse une chaîne de caractères JSON et construit la valeur JavaScript ou l'objet décrit par cette chaîne.*/

      
      //Ajout du produit dans le localStorage
      if(teddy.length == 0){
        ajoutProduct(teddy);
        saveProduct(teddy);

      }else{
        for(let i=0; i < teddy.length; i++){
          if(teddy[i]._id == element._id){
            teddy[i].quantite++;
            teddy[i].newPrice = teddy[i].price * teddy[i].quantite;
            saveProduct(teddy);
            break;
          }else{
            ajoutProduct(teddy);
            saveProduct(teddy);
            break;
          }
        }
      }
    }
  });

});


// Fonctions

// Ajout de produit nouveau produit dans "teddy"
function ajoutProduct(teddy){
  teddy.push({"_id": element._id, "name": element.name, "price": element.price, "newPrice": element.price, "quantite": 1, "url": element.url});
}

// Enregistre les changements apportés a "teddy" sur le localStorage
function saveProduct(teddy){
  let items = JSON.stringify(teddy);
  localStorage.setItem("teddy", items);
  modal.style.display = "block";
  panier.style.display = "none";
}

//fonction Récupère couleur du produit
const colors = (teddy) =>{
  let result = "";

  for(let i =0; i < teddy.length; i++){
    result += `<div>
      <input type="radio" class="choix" id="${teddy[i]}" name="colors" value="${teddy[i]}">
      <label for="${teddy[i]}">${teddy[i]}</label></br>
    </div>`;


  }

  
  return result;
}