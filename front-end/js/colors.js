

// fonction pour la création du tableau dans le localStorage
const items = ()=>{

    // Créations des variables
    let total = 0;
    let items = [];
  
    // Enregistrment dans le localStorage
    let teddy = JSON.stringify(items);
    localStorage.setItem ("teddy", teddy);
    localStorage.setItem ("total", total);
  
  }
  
  
  if(localStorage.teddy == undefined){
  
    items();
  
  }