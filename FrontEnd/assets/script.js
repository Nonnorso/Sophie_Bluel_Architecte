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
document.querySelectorAll('.btnFilter').forEach(button => {
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
  modalTitle.classList.add('modalTitle2Style')

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
imageIcon.src = "./assets/icons/picture-svgrepo-com%201image-icon.jpg";
imageIcon.classList.add('modalFormIcon');

const inputFile = document.createElement('input');
inputFile.type = 'file';
inputFile.accept = 'image/*';
inputFile.style.display = 'none';
inputFile.name = 'image'; // Ajout de l'attribut "name"

const previewImage = document.createElement('img');
previewImage.id = 'preview';
previewImage.classList.add('preview');
previewImage.src = '#';
previewImage.alt = "Prévisualisation de l'image";
previewImage.style.display = 'none';

const addImageButton = document.createElement('button');
addImageButton.type = 'button';
addImageButton.textContent = "+ Ajouter photo";
addImageButton.classList.add('addImageButtonStyle');

const infoSpan = document.createElement('span');
infoSpan.textContent = "jpg, png : 4mo max";
infoSpan.classList.add('infoSpanStyle');

imageContainer.append(imageIcon);
imageContainer.append(previewImage);
imageContainer.append(inputFile);
imageContainer.append(addImageButton);
imageContainer.append(infoSpan);

// Écouter l'événement "click" sur le bouton "addImageButtonStyle"
addImageButton.addEventListener('click', function() {
  inputFile.click(); // Simuler un clic sur l'input file
});

// Écouter l'événement "change" de l'input file
inputFile.addEventListener('change', function() {
  const file = inputFile.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      previewImage.src = e.target.result; // Afficher l'image prévisualisée
      previewImage.style.display = 'block'; // Afficher l'image prévisualisée
      imageIcon.classList.add('hidden'); // Masquer l'icône de l'image
      addImageButton.classList.add('hidden'); // Masquer le bouton "Ajouter photo"
      infoSpan.classList.add('hidden'); // Masquer l'infoSpan
    };
    reader.readAsDataURL(file);
  } else {
    previewImage.src = '#'; // Réinitialiser l'image prévisualisée
    previewImage.style.display = 'none'; // Cacher l'image prévisualisée
    imageIcon.classList.remove('hidden'); // Afficher l'icône de l'image
    addImageButton.classList.remove('hidden'); // Afficher le bouton "Ajouter photo"
    infoSpan.classList.remove('hidden'); // Afficher l'infoSpan
  }
});

// Ajouter l'image avant le bouton
imageContainer.insertBefore(previewImage, addImageButton);

// Ajouter le champ pour afficher l'image au formulaire
form.append(imageContainer);

// Champ "titre"
const titleInput = document.createElement('input');
titleInput.type = 'text';
titleInput.classList.add('modalFormTitle');
titleInput.name = 'title'; // Ajout de l'attribut "name"

// Ajouter l'étiquette pour le champ "titre"
const titleLabel = document.createElement('label');
titleLabel.textContent = 'Titre';
titleLabel.htmlFor = 'titleInput';
titleLabel.classList.add('modalFormLabel');

// Champ "catégorie"
const categorySelect = document.createElement('select');
categorySelect.classList.add('modalFormCategory');
categorySelect.name = 'category'; // Ajout de l'attribut "name"

// Ajouter l'étiquette pour le champ "catégorie"
const categoryLabel = document.createElement('label');
categoryLabel.textContent = 'Catégorie';
categoryLabel.htmlFor = 'categorySelect';
categoryLabel.classList.add('modalFormLabel');

// Ajouter les éléments "étiquette" et "champ" au formulaire
form.append(titleLabel);
form.append(titleInput);
form.append(categoryLabel);
form.append(categorySelect);

// Récupérer les catégories de l'API
fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(data => {
    // Gérer la réponse de l'API
    data.forEach(category => {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.append(option);
    });
  })
  .catch(error => {
    // Gérer les erreurs de la requête
    console.error('Erreur lors de la récupération des catégories :', error);
  });

// Bouton "Valider"
const submitButton = document.createElement('input');
submitButton.type = 'submit';
submitButton.value = 'Valider';
submitButton.classList.add('modalFormButton');

// Écouteur d'événement pour la soumission du formulaire
form.addEventListener('submit', function(event) {
  event.preventDefault();

  if (!validateForm()) {
    // La validation a échoué, ne pas envoyer le formulaire
    return;
  }

  // Récupérer les valeurs des champs du formulaire
  const titleValue = titleInput.value;
  const categoryValue = categorySelect.value;
  const imageFile = inputFile.files[0];

  // Créer un objet FormData pour envoyer les données multipart/form-data
  const formData = new FormData();
  formData.append('title', titleValue);
  formData.append('category', categoryValue);
  formData.append('image', imageFile);

  // Envoyer les données à votre API en tant que requête POST
  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      // Gérer la réponse de votre API ici
      console.log('Réponse de l\'API :', data);
      // Effectuer les actions nécessaires après l'envoi réussi du formulaire

      // Réinitialiser les champs du formulaire
      titleInput.value = '';
      categorySelect.value = '';
      inputFile.value = '';
      previewImage.src = '#';
      previewImage.style.display = 'none';
      imageIcon.classList.remove('hidden');
      addImageButton.classList.remove('hidden');
      infoSpan.classList.remove('hidden');
      // Réinitialiser l'aspect du bouton "Valider"
      submitButton.classList.remove('valid');
    })
    .catch(error => {
      // Gérer les erreurs de la requête ici
      console.error('Erreur lors de l\'envoi des données :', error);
    });
});

// Fonction de validation du formulaire
function validateForm() {
  const file = inputFile.files[0];
  const allowedExtensions = /(\.jpg|\.png)$/i;
  const maxSize = 4 * 1024 * 1024; // 4 Mo

  if (!file) {
    // Aucun fichier sélectionné
    showError('Veuillez sélectionner un fichier ".jpg" ou ".png" de 4 Mo maximum');
    submitButton.classList.remove('valid');
    return false;
  }

  if (!allowedExtensions.test(file.name)) {
    // Extension de fichier non autorisée 
    showError('Les extensions de fichier autorisées sont .jpg et .png.');
    submitButton.classList.remove('valid');
    return false;
  }

  if (file.size > maxSize) {
    // Fichier trop volumineux
    showError('La taille du fichier ne doit pas dépasser 4 Mo.');
    submitButton.classList.remove('valid');
    return false;
  }

  const titleValue = titleInput.value.trim(); // Supprimer les espaces vides au début et à la fin

  if (titleValue === '') {
    showError('Veuillez ajouter un titre.');
    submitButton.classList.remove('valid');
    return false;
  }

  hideError();
  submitButton.classList.add('valid');
  return true;
}

// Fonction pour afficher le message d'erreur
function showError(message) {
  errorSpan.textContent = message;
  errorSpan.style.display = 'flex';
}

// Fonction pour masquer le message d'erreur
function hideError() {
  errorSpan.textContent = '';
  errorSpan.style.display = 'none';
}

// Écouteur d'événement "change" de l'input file pour la validation en temps réel
inputFile.addEventListener('change', function() {
  validateForm();
});

// Ajouter le bouton au formulaire
form.append(submitButton);

 // Insérer la modalBar après modalFormCategory et avant modalFormButton
 const modalFormCategory = form.querySelector('.modalFormCategory');
 const modalFormButton = form.querySelector('.modalFormButton');
 modalFormCategory.parentNode.insertBefore(modalBar, modalFormButton);

// Ajouter le formulaire à la modale
const modalContent = modal.querySelector('.modal-wrapper');
modalContent.append(form);

const errorSpan = document.createElement('span');
errorSpan.classList.add('modalFormError');
errorSpan.style.display = 'none';

// Ajouter l'élément span après le bouton de soumission
submitButton.parentNode.insertBefore(errorSpan, submitButton.nextSibling);

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

