
//Initialisation du template
let template = document.querySelector("#product");

//Requête http fetch pour récupérer l'API
fetch("http://localhost:3000/api/teddies")
  .then((response) => response.json())
  .then((teddies) => {
    //Boucle for pour récupérer toutes les cameras
    for (let index = 0; index < teddies.length; index++) {
      //Création de la structure
      let ul = document.createElement("ul");
      ul.classList.add("list-group", "shadow", "w-100", "mb-2");
      template.appendChild(ul);
      // console.log(ul);

      let li = document.createElement("li");
      li.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-around",
        "px-5"
      );
      ul.appendChild(li);
      // console.log(li);

      //Ajout teddyImg
      let teddyImg = document.createElement("img");
      teddyImg.classList.add("rounded", "index");
      teddyImg.setAttribute("src", teddies[index].imageUrl);
      teddyImg.setAttribute("alt", "Ours en peluche");
      li.appendChild(teddyImg);
      // console.log(teddiesImg);

      //Ajout teddyName
      let teddyName = document.createElement("p");
      teddyName.classList.add("mt-4", "d-none", "d-sm-block", "font-weight-bold");
      teddyName.innerHTML = teddies[index].name;
      li.appendChild(teddyName);
      // console.log(teddyName);

      //Bouton avec lien voir le produit
      let btnTeddy = document.createElement("a");
      btnTeddy.classList.add(
        "btn",
        "btn-outline-primary",
        "btn-prod",
        "d-flex",
        "align-items-center"
      );
      btnTeddy.href = "produits.html?id=" + teddies[index]._id;
      btnTeddy.innerHTML = "Voir le produit";
      li.appendChild(btnTeddy);
      // console.log(btnTeddy);
      // console.log(btnTeddy.href);
    }
    // console.log(teddy);
  })
  .catch((error) => console.log(error));
