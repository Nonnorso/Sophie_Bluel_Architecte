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

    return galleryGrid

}

export { createWorks }