import { createFilters } from './factory/createFilters.js'
import { createWorks } from './factory/createWorks.js'

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
// Je dois appeller ma fonction apres le chargement des travaux
  LoginStatus();

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

//Je dois appeller ma fonction apres le chargement des travaux 
  LoginStatus();
  
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

//************* création du formulaire de connexion **************//
const form = document.querySelector('#form');

//verifier la présence de "#form" pou n'appliquer ce code qu'à la page concernée)
if (form) {
const inputEmail = document.querySelector('#e-mail');
const inputPassword = document.querySelector('#password');

// Événement de soumission du formulaire
form.addEventListener('submit', (e) => {
  e.preventDefault(); 
  
// Vérification de la combinaison e-mail/mot de passe
  const email = inputEmail.value;
  const password = inputPassword.value;
    
  if (email === 'sophie.bluel@test.tld' && password === 'S0phie') {  
// redirection de l'utilisateur vers la page de connexion et confirmation de connexion
  localStorage.setItem('isLoggedIn', 'true');
  window.location.href = 'index.html';

  } else {
    alert('Erreur dans l’identifiant ou le mot de passe');
  }
});
}

// Fonction pour vérifier la connexion et mettre à jour la navigation
function LoginStatus() {
  if (localStorage.getItem('isLoggedIn') === 'true') {
    const loginLink = document.querySelector('#loginLink');

//verification de la présence de l'ID LoginLink pour s'assurer d'appliquer la fonction lorsque l'on est connecté    
    if (loginLink) {
      loginLink.textContent = 'logout';

      loginLink.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        location.reload();
    });
  }
}
}

// Événement DOMContentLoaded pour exécuter le code une fois que la page est chargée
document.addEventListener('DOMContentLoaded', () => {
  
// Vérifier la connexion à chaque chargement de la page
  LoginStatus();

// Mettre à jour le contenu de l'élément "#loginLink" lors du chargement de la page
const loginLink = document.querySelector('#loginLink');

if (loginLink && localStorage.getItem('isLoggedIn') === 'true') {
  loginLink.textContent = 'logout';

  loginLink.addEventListener('click', (e) => {
    e.preventDefault();

    localStorage.removeItem('isLoggedIn');
    location.reload();
});
}});
