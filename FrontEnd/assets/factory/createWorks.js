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
//demande d'affichage des travaux dans la grid de la modale
    const modalGallery = document.getElementById('modalGallery');
//clonage des images à afficher
    const modalImg = galleryImg.cloneNode(true);
// Ajout de la classe personnalisée pour pouvoir modifier l'apparence de mes images
    modalImg.classList.add('modalImg'); 
    modalGallery.append(modalImg);

    return galleryGrid

}

export { createWorks }
