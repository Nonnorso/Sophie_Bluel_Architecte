// import { createFilters } from './factory/createFilters.js'
// import { createWorks } from './factory/createWorks.js'

const token = sessionStorage.getItem("token") ? sessionStorage.getItem("token") : null
const userId = sessionStorage.getItem("userId") ? sessionStorage.getItem("userId") : null

if(userId !== null && token !== null) {

  LoginStatus();

}

// Récuperation des travaux de l'API
await fetch('http://localhost:5678/api/works')
.then(response => response.json())
.then(data => {

  const galleryContainer = document.querySelector('.gallery');

  data.forEach(item => {
    galleryContainer.append(
      createWorks(
        item.category.id,
        item.imageUrl,
        item.title
    ))

  });
})

.catch(error => console.log(error))

// Récupération des catégories de l'API
await fetch('http://localhost:5678/api/categories')
.then(response => response.json())
.then(data => {

  data.unshift({
    id: 0,
    name: 'Tous'
  })

  const filterBox = document.querySelector('.filter')
  
  data.forEach(item => {
    filterBox.append(
      createFilters(
        item.id,
        item.name
    ))

  });
})

.catch(error => console.log(error))

// Gestion des filtres
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    const categoryId = button.getAttribute('data-cat-id')
    
    document.querySelectorAll('.work-item').forEach(item => {
      item.classList.remove('work-item--active')
      if(item.getAttribute('data-cat-id') === categoryId || categoryId === '0') item.classList.add('work-item--active')
    })
  })
});

//*********** Mettre à jour la navigation login/logout & barre d'édition***************//
function LoginStatus() {
  
  const loginLink = document.querySelector('#loginLink');
  const editContainer = document.querySelector('.editionBar');

  if (token && userId) {
//verification de la présence de l'ID LoginLink pour s'assurer d'appliquer la fonction lorsque l'on est connecté    
    if (loginLink) {
      loginLink.textContent = 'logout';

      loginLink.addEventListener('click', (event) => {
         event.preventDefault();
//supression de la modification du texte et de l'objet "isLoggedIn" et rechargement de la page
         sessionStorage.clear();
         location.reload();
    });
  }
//Ajout de la classe à ma barre d'edition pour l'afficher
  if (editContainer) {
    editContainer.style.display = 'flex';
  }

  if (editContainer) {
    editContainer.classList.add('centerEdition');
  }
}

//revenir à l'etat déconnecté et afficher de nouveau l'option de connexion
  else{
    if (loginLink){
      loginLink.textContent = 'login';

      loginLink.addEventListener('click', (event) => {
        event.preventDefault();

// redirection vers la page de connexion
  window.location.href = 'logIn.html';
    });
  }

//masquer la barre d'edition lorsque l'on est déconecté
if (editContainer) {
  editContainer.style.display = 'none';
}

if (editContainer) {
  editContainer.classList.remove('centerEdition');
}
}

// Événement DOMContentLoaded pour exécuter le code une fois que la page est chargée
document.addEventListener('DOMContentLoaded', () => {
  
// Vérifier la connexion à chaque chargement de la page
  LoginStatus();

// Mettre à jour le contenu de l'élément "#loginLink" lors du chargement de la page
const loginLink = document.querySelector('#loginLink');

if (loginLink && token && userId) {
  loginLink.textContent = 'logout';

  loginLink.addEventListener('click', (event) => {
    event.preventDefault();
    sessionStorage.clear();
    location.reload();
});
}})};
