//Ajout d'une fonction de redirection au clic sur l'element titre du site
document.addEventListener('DOMContentLoaded', () => {

  const h1Elements = document.querySelectorAll('#header h1');

  h1Elements.forEach((element) => {

    element.addEventListener('click', () => {
      window.location.href = 'index.html'; // Remplacez 'accueil.html' par le lien de votre page d'accueil
    });
  });
});

// import des travaux de récupération des fetch
import { createFilters } from './factory/createFilters.js'
import { createWorks } from './factory/createWorks.js'

//création des constantes pour récuperer les données stockées dans le sessionStorage
const token = sessionStorage.getItem("token") ? sessionStorage.getItem("token") : null
const userId = sessionStorage.getItem("userId") ? sessionStorage.getItem("userId") : null

//condition de déclenchement de la fonction LoginStatus
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
        item.title,
        item.id
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

//**************************************** Mettre à jour la navigation login/logout & barre d'édition****************************//
function LoginStatus() {
  
  const loginLink = document.querySelector('#loginLink');
  const editContainer = document.querySelector('.editionBar');
  const headerPosition = document.querySelector('#header');
  const filterBox = document.querySelector('.filter')
  const projectLink = document.querySelector('.ProjectBarLink')

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
//ajout de la marge à mon header
  if (headerPosition) {
    headerPosition.classList.add('headerPadding');
}
//suppression des filtres
  if (filterBox){
    filterBox.style.display = "none";
}

//ajout du lien modifier à la section Projets
  if(projectLink){
    projectLink.style.display = "flex";
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

if (header) {
  header.classList.remove('headerPadding');
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

    if(token && userId){
      sessionStorage.clear();
      location.reload();
    }

    else{
      window.location.href = 'logIn.html';
    }   
});
}})};

//*********************************ajoute de la fonctionnalité pour ouvrir/fermer ma modale ************************************//
let modal;
let resetModal = null;

//********************************************************* ouvrir la modale ********************************************/
const openModal = function (event) {
  event.preventDefault()
  event.stopPropagation();

  modal = document.querySelector(event.target.getAttribute('href'))

//affichage de la boite modale
  modal.style.display = 'none';
  modal.removeAttribute('aria-hidden')
  modal.setAttribute('aria-modal', 'true')
  resetModal = modal.cloneNode(true); 

  initialModal();
};

function initialModal() {

  if(!modal){
    console.error("L'élément modal n'a pas été trouvé.");
    return;
  }

  // Affichage de la boîte modale
  modal.style.display = 'flex';
  modal.removeAttribute('aria-hidden');
  modal.setAttribute('aria-modal', 'true');

  // Fermeture de la boîte modale en cliquant en dehors
  modal.addEventListener('click', closeModal);

  // Fermeture de la boîte modale en cliquant sur la croix
  const closeButton = modal.querySelector('.jsCloseModal');
  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  const modalWrapper = modal.querySelector('.modal-wrapper');
  if (modalWrapper) {
    modalWrapper.addEventListener('click', stopPropagation);
  }

  // Ajout de l'événement de suppression sur les corbeilles
  const deleteIcons = modal.querySelectorAll('.fa-trash-can');
  deleteIcons.forEach((icon) => {
    icon.addEventListener('click', function(event) {
      event.preventDefault();
      deleteImage(event);
    });
  });

  // Vérifier si la modalGallery doit être affichée ou masquée
  const modalGallery = modal.querySelector('.modalGallery');
  if (modalGallery.style.display === 'none') {
    return; // Ne pas charger les images si la galerie est masquée
  }

  // Ajout de l'événement de clic sur le bouton modalBtn
  const modalBtn = modal.querySelector('.modalBtn');
  if (modalBtn) {
    modalBtn.addEventListener('click', openModal2);
  }

  // Réinitialiser la valeur de resetModal
  resetModal = modal.innerHTML;
};



//*************************************************** suppression des travaux à l'interieur de la modale ************************/
//ajout de la fonction de suppréssion des travaux
const deleteImage = function (event) {
  event.preventDefault();

  const itemId = event.target.getAttribute('data-item-id');

  // Afficher une boîte de dialogue de confirmation
 if (confirm
  ("Êtes-vous sûr de vouloir supprimer cette image ?")) {

  fetch(`http://localhost:5678/api/works/${itemId}`, {
      method: 'DELETE',
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
  })

    .then (response => {
      console.log(response);
      
      //confirmation de suppression
      alert('Suppression réussie !');
      
      //gerer l'affichage dynamique des galeries suite à la suppression
      const galleryItem = document.querySelector(`.gallery [data-item-id="${itemId}"]`);
        
      if (galleryItem) {
          galleryItem.remove();
        }

        const modalItem = document.querySelector(`#modalGallery [data-item-id="${itemId}"]`);
        if (modalItem) {
          modalItem.closest('.image-container').remove();
        }

         // Mettre à jour la valeur de resetModal
         resetModal = modal.innerHTML;
    })

    .catch(error => console.log(error));
 }

      else {
      // Gestion des erreurs lors de la suppression
      alert("Une erreur s'est produite lors de la suppression de l'image.");
      }};

//fonction pour tout supprimer d'un coup
const deleteGallery = function (event) {
  event.preventDefault();

  // Confirmation
  if (confirm("Êtes-vous sûr de vouloir supprimer toute la galerie ?")) {
    // Sélection de tous les items à supprimer et création d'une boucle pour tous les sélectionner, quel que soit le nombre de travaux récupérés
    const galleryItems = document.querySelectorAll('.gallery .work-item');
    const galleryItemIds = Array.from(galleryItems).map(item => item.getAttribute('data-item-id'));

    galleryItems.forEach(item => item.remove());

    // Supprimer les travaux de la modalGallery
    const modalGalleryItems = document.querySelectorAll('#modalGallery .image-container');
    modalGalleryItems.forEach(item => item.remove());

    Promise.all(
      galleryItemIds.map(itemId => {
        return fetch(`http://localhost:5678/api/works/${itemId}`, {
          method: 'DELETE',
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => console.log(error));
      })
    )
    .then(() => {
      // Confirmation de la suppression de la galerie
      alert('Suppression de la galerie réussie !');
    })
    .catch(error => {
      // Gestion des erreurs lors de la suppression de la galerie
      alert("Une erreur s'est produite lors de la suppression de la galerie.");
      console.log(error);
    });
    
    // Mettre à jour la valeur de resetModal
    resetModal = modal.innerHTML;
  }
};

//ajout d'evenement pour supprimer toute la galerie
  const deleteAll = document.querySelector('.deleteWorkModal');
  deleteAll.addEventListener('click', deleteGallery);

//************************************************************** fermeture de la modale *********************************************************/
//Parametrage de la fermeture de la modale
const closeModal = function (event) {
  if (modal === null) return;
  event.preventDefault();

//verification si une suppréssion a été effectuée
const isImageDeleted = event.target.classList.contains('fa-trash-can');
if (isImageDeleted) {

// Ne pas fermer la modale si la suppression a été effectuée
  return;
}

 // Réinitialiser la modale
 modal.innerHTML = resetModal;

//masquer la boite modale
  modal.style.display = "none"
  modal.setAttribute('aria-hidden', 'true')
  modal.removeAttribute('aria-modal')
  modal.removeEventListener('click', closeModal)
  modal.querySelector('.jsCloseModal').removeEventListener('click', closeModal)
  modal.querySelector('.modal-wrapper').removeEventListener('click', stopPropagation)
  modal = null
}

//empecher la fermeture de modale au clik dans la boite modale
const stopPropagation = function (event){
  event.stopPropagation()
}

//ouverture de la boite modale sur le click des liens
document.querySelectorAll('.jsModal').forEach(a =>{
  a.addEventListener('click', openModal)
})

//option de fermeture de la modale en appuyant sur "esc" ou "echap" selon le modele
window.addEventListener('keydown', function (event) {
  if(event.key === "Escape" || event.key === "Esc"){
    closeModal(event)
  }
})

//********************************* Modifier la modale et gerer l'ajout d'un image ***********************************************//
//ajout d'une fonction pour modifier l'apparence de la modal au click sur le boutton
function openModal2 () {

//appel de la fonction pour reinitialiser l'apparence de la modale de base
modal.innerHTML = resetModal;
initialModal();
  
  //modifier le texte du titre
  const modalTitle = modal.querySelector('.modalTitle');
  modalTitle.textContent = 'Ajout photo';

  // Masquer la galerie
  const modalGallery = modal.querySelector('.modalGallery');
  modalGallery.style.display = 'none';

   // Vider la galerie dans la modal
   modalGallery.innerHTML = '';

  // Masquer le bouton modalBtn
   const modalBtn = modal.querySelector('.modalBtn');
  if (modalBtn) {
    modalBtn.style.display = 'none';
  }

  // Sélectionner la modalBar existante
  const modalBar = document.querySelector('.modalBar');

//****************************** partie du formulaire d'ajout photo ***************************************************************//

  // Création du formulaire
  const form = document.createElement('form');
  form.classList.add('modalForm', 'modalFormContainer');

  // Champ pour afficher l'image
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('modalFormImage');

  const imageIcon = document.createElement('img');
  imageIcon.src = "/icons/picture-svgrepo-com%201image-icon.jpg";

  const inputFile = document.createElement('input');
  inputFile.type = 'file';
  inputFile.accept = 'image/*';

  const previewImage = document.createElement('img');
  previewImage.id = 'preview';
  previewImage.classList.add('preview');
  previewImage.src = '#';
  previewImage.alt = "Prévisualisation de l'image";
  previewImage.style.display = 'none';

  const addImageButton = document.createElement('button');
  addImageButton.type = 'button';
  addImageButton.textContent = "+ Ajouter photo";

  const infoSpan = document.createElement('span');
  infoSpan.textContent = "jpg, png : 4mo max";

  imageContainer.append(imageIcon);
  imageContainer.append(previewImage);
  imageContainer.append(addImageButton);
  imageContainer.append(infoSpan);

  // Ajouter l'image avant le bouton
  imageContainer.insertBefore(previewImage, addImageButton);

  // Ajouter le champ pour afficher l'image au formulaire
  form.append(imageContainer);

  // Champ "titre"
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.classList.add('modalFormTitle');

  // Ajouter l'étiquette pour le champ "titre"
  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Titre';
  titleLabel.htmlfor = 'titleInput';
  titleLabel.classList.add('modalFormLabel');

  // Champ "catégorie"
  const categorySelect = document.createElement('select');
  categorySelect.classList.add('modalFormCategory');
  const categories = ['', '', ''];

  // Ajouter l'étiquette pour le champ "catégorie"
  const categoryLabel = document.createElement('label');
  categoryLabel.textContent = 'Catégorie';
  categoryLabel.for = 'categorySelect';
  categoryLabel.classList.add('modalFormLabel');

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.append(option);
  });

  // Créer le conteneur du bouton du formulaire
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('modalButtonContainer');

  // Bouton "valider"
  const submitButton = document.createElement('input');
  submitButton.type = 'submit';
  submitButton.value = 'Valider';
  submitButton.classList.add('modalFormContainer', 'modalFormButton', 'modalButton');

  // Ajouter le bouton au conteneur du bouton
  buttonContainer.append(submitButton);

  // Ajouter le formulaire à la modale
  const modalContent = modal.querySelector('.modal-wrapper');
  modalContent.append(form);

  // Ajouter le conteneur du bouton à la modalWrapper
  modalContent.append(buttonContainer);

  // Écouteur d'événement pour la soumission du formulaire
  form.addEventListener('submit', function(event) {
    event.preventDefault();
  });

  // Ajouter les éléments au formulaire
  // Champ pour afficher l'image
  form.append(imageContainer);

  // Étiquette et champ "titre"
  const titleContainer = document.createElement('div');
  titleContainer.classList.add('modalFormField');

  titleContainer.append(titleLabel);
  titleContainer.append(titleInput);

  form.append(titleContainer);

  // Étiquette et champ "catégorie"
  const categoryContainer = document.createElement('div');
  categoryContainer.classList.add('modalFormField');

  categoryContainer.append(categoryLabel);
  categoryContainer.append(categorySelect);

  form.append(categoryContainer);

  // Ajouter la modalBar avant le bouton de soumission
  submitButton.parentNode.insertBefore(modalBar, submitButton.nextSibling);

  // Bouton "valider"
  buttonContainer.append(submitButton);

 //************************************************* fin formulaire  *************************************************************//  
  
   //masquer la span "supprimer la gallerie"
   const deleteAll = document.querySelector('.deleteWorkModal');
   deleteAll.style.display = 'none';

  // Stocker les images de la galerie d'origine
  const originalGalleryItems = modalGallery.querySelectorAll('.image-container');

  //affichage de la fleche de retour
  document.querySelector('.arrowLeftPosition').style.display = 'flex';

  //ajout du click pour reinitialiser la modale
  const arrowRtrn = modal.querySelector('.arrowLeftPosition');
  arrowRtrn.addEventListener('click', function() {

  // Restaurer les images de la galerie
  const galleryContainer = modal.querySelector('.modalGallery .gallery');

      if (galleryContainer) {
      galleryContainer.innerHTML = '';
        
      originalGalleryItems.forEach(item => {
      galleryContainer.append(item);
      });
      }
    
  modal.innerHTML = resetModal;
  initialModal();

  // Masquer la flèche de retour
  document.querySelector('.arrowLeftPosition').style.display = 'none';

  //réaffecter les écouteurs d'événements
  modalBtn.addEventListener('click', openModal2);
  
  const deleteAll = document.querySelector('.deleteWorkModal');
  deleteAll.addEventListener('click', deleteGallery);
  });
}