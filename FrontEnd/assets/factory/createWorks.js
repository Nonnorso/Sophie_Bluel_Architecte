function createWorks (categoryId, imageUrl, title, itemId) {
    
    const galleryGrid = document.createElement('div');
    galleryGrid.classList.add('work-item')
    galleryGrid.classList.add('work-item--active')
    galleryGrid.setAttribute('data-cat-id', categoryId);
    galleryGrid.setAttribute('data-item-id', itemId);

    const galleryImg = document.createElement('img');
    galleryImg.src = imageUrl;
    
    const titleImg = document.createElement('span');
    titleImg.innerHTML = title;

    galleryGrid.append(galleryImg);
    galleryGrid.append(titleImg);

//*********affichage des travaux de l'api egalement dans la modale *********/

  const modalGallery = document.getElementById('modalGallery');

// Ajout de l'icône de suppression uniquement aux images de la modalGallery
  if (modalGallery) {

//clonage des images affichées dans la galerie
    const modalImg = galleryImg.cloneNode(true);
    modalImg.classList.add('modalImg');

//ajout de l'item nouvellement récupéré pour attribuer l'id aux images de l'api
    modalImg.setAttribute('data-item-id', itemId);

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    imageContainer.append(modalImg);

// Création de l'icône de suppression
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid', 'fa-trash-can');

//ajout de l'item nouvellement récupéré pour attribuer l'id aux images de l'api
    deleteIcon.setAttribute('data-item-id', itemId);
    imageContainer.append(deleteIcon);

// Ajout du texte "éditer"
    const editText = document.createElement('span');
    editText.innerHTML = "éditer";
    editText.classList.add('editTextStyle');
    imageContainer.append(editText);

    modalGallery.append(imageContainer);
  }

    return galleryGrid

}

export { createWorks }
