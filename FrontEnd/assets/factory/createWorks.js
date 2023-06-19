function createWorks (categoryId, imageUrl, title) {
    
    const galleryGrid = document.createElement('div');
    galleryGrid.classList.add('work-item')
    galleryGrid.classList.add('work-item--active')
    galleryGrid.setAttribute('data-cat-id', categoryId);

    const galleryImg = document.createElement('img');
    galleryImg.src = imageUrl;
    
    const titleImg = document.createElement('span');
    titleImg.innerHTML = title;

    galleryGrid.append(galleryImg);
    galleryGrid.append(titleImg);

//*********affichage des travaux de l'api egalement dans la modale *********/

  // Ajout de l'icône de suppression uniquement aux images de la modalGallery
  const modalGallery = document.getElementById('modalGallery');
  if (modalGallery) {
    const modalImg = galleryImg.cloneNode(true);
    modalImg.classList.add('modalImg');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    imageContainer.append(modalImg);

// Création de l'icône de suppression
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid', 'fa-trash-can');
    imageContainer.append(deleteIcon);

// Ajout du texte "éditer"
    const editText = document.createElement('a');
    editText.innerHTML = "éditer";
    editText.classList.add('editTextStyle');
    imageContainer.append(editText);

    modalGallery.append(imageContainer);
  }

    return galleryGrid

}

export { createWorks }
