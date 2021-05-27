

// Fonction pour la création du tableau dans le localStorage
/* si l'onglet est fermé ou rafraichit, on perd les données d'un formulaire*/
/* Maintient une zone de stockage distinct */

const items = ()=> {

    let total = 0; // Créations des variables
    let items = [];
    
      let teddy = JSON.stringify(items); // Enregistrement dans le localStorage, convertit une valeur JavaScript en chaîne JSON.
      localStorage.setItem ("teddy", teddy);
      localStorage.setItem ("total", total);
    
    }
    
    if(localStorage.teddy == undefined){
    
      items();
    
    }
    
  