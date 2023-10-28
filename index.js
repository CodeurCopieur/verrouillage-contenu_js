class locked {

  #parents

  constructor(elts) {
    this.#parents = elts

  }

  updateJSONOnServer(bool) {
    var username = null
    // URL du fichier JSON sur le serveur
    const url = 'data.json';
    
    if (bool) {
        username = prompt("Entrez votre nom d'utilisateur :");
        alert("La page est verrouillée par " + username + ".");

        

        // Effectuer une requête pour récupérer le fichier JSON actuel depuis le serveur
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Impossible de récupérer le fichier JSON du serveur.');
        }
    })
    .then(currentData => {

      // Mettre à jour les données
      currentData.isLocked = bool;
      currentData.User = username; // Mettre à jour avec le nom d'utilisateur souhaité
      console.log(currentData, ' :)');

      // // Envoyer le fichier JSON mis à jour au serveur
      return fetch(url, {
          method: 'PATCH',
          body: JSON.stringify(currentData),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
      });
    })
    .then(response => {
      if (response.ok) {
          alert('Le fichier JSON a été mis à jour sur le serveur.');
      } else {
          alert('Une erreur s\'est produite lors de la mise à jour du fichier JSON.');
      }
    })
    .catch(error => {
      alert('Erreur de mise à jour du fichier JSON : ' + error);
      console.log(error, ' :)');
    });
    
    
    }
  }

  ChildFilter() {
    const childs = Array.from(this.#parents.querySelectorAll('ul li'))
    console.log(childs);

    childs.forEach( child => {
      child.addEventListener('click', (e) => this.#toggleFilter(e))
    })
    
  }

  #toggleFilter(e) {
    const target = e.currentTarget
    if (target.id === 'connecte') {
      this.updateJSONOnServer(true)
    } else {
      this.updateJSONOnServer(false)
    }
  }



}

addEventListener('load', ()=> {
  header = document.querySelector('header')

  const lock = new locked(header)

  lock.ChildFilter()

})