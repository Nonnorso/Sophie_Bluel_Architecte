//************* création du formulaire de connexion **************//

const form = document.querySelector('#form');
const inputEmail = document.querySelector('#e-mail');
const inputPassword = document.querySelector('#password');

// Événement de soumission du formulaire
form.addEventListener('submit', (e) => {
  e.preventDefault(); 
  
// Vérification de la combinaison e-mail/mot de passe
  const email = inputEmail.value;
  const password = inputPassword.value;
    
  if (email === 'sophie.bluel@test.tld' && password === 'S0phie') {
    alert('Connexion réussie !');
  } else {
    alert('Combinaison e-mail/mot de passe incorrecte. Veuillez réessayer.');
  }
});