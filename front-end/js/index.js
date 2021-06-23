

//Création d'une fonction async pour la récupération des données et création du contenu de la page d'acceuil

const getTeddies = async function() {
  try {
      //Création d'une variable pour récupérer la réponse de l'envoie fetch
      let reponse = await fetch('http://localhost:3000/api/teddies/');
      //Création d'une condition if si la réponse est ok
      if (reponse.status === 200) { // Le code de statut de réponse HTTP 200 OK indique la réussite d'une requête.
          let teddies = await reponse.json();
      
          //Création d'une boucle pour récupérer les données de fetch et créer la page index.html
          for (let teddy of teddies) { 

            // Récupération de la div avec id teddies de la page index.html pour la mettre dans une constante
            const divTeddies = document.getElementById('teddies');

            //Création d'une div row dans la div teddies
            const divRowTeddies = document.createElement('div');
            divTeddies.appendChild(divRowTeddies);
            divRowTeddies.className = 'row';

            //Création div col dans la div row
            const divColTeddies = document.createElement('div');
            divRowTeddies.appendChild(divColTeddies);
            divColTeddies.className = 'col-sm-12 text-center accueil-ours';

            //Création du h3 pour le titre du teddy
            const h3RefTeddies = document.createElement('h3');
            divColTeddies.appendChild(h3RefTeddies);
            h3RefTeddies.textContent = teddy.name;

            //Création du tarif pour le teddy
            const prixTeddies = document.createElement('p');
            divColTeddies.appendChild(prixTeddies);
            prixTeddies.textContent = teddy.price / 100 + " €";

            //Création de l'image du teddy
            const imgTeddies = document.createElement('img');
            divColTeddies.appendChild(imgTeddies);
            imgTeddies.setAttribute('src', teddy.imageUrl);
            imgTeddies.setAttribute('alt', "Ours en peluche qui s'appelle " + teddy.name);
            imgTeddies.setAttribute('title', "Ours qui s'appelle " + teddy.name);
            imgTeddies.setAttribute('width', "100%");

            //Création du lien pour aller vers la page produit
            const ligneProduit = document.createElement('a');
            ligneProduit.textContent = "Personnaliser " + teddy.name;
            divColTeddies.appendChild(ligneProduit);
            ligneProduit.href = "produits.html?id=" + teddy._id;
            ligneProduit.setAttribute('title', "Venez découvrir" + teddy.name);
          }

        //Création d'une conditon else si la réponse est erreur
      } else {
      console.error('Le serveur retourne : ', reponse.status);
      alert("Une erreur est survenue : " + reponse.status);
      } 
  } catch (error) {
    alert("l'erreur suivante est survenu : " + error);
  }
}

//lancement de la fonction
getTeddies();
