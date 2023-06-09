//Recuperation des travaux de l'API

const url = 'http://localhost:5678/api/works';

async function recoveryWorks() {

const query = await fetch(url, {
    method: 'GET'
   });

   if(!query.ok){
    alert('Un problème est survenu.');
   }

   else{
    const data = await query.json();
    console.log(data);

    const galleryContainer = document.querySelector('.gallery');
    
    data.forEach(item => {

    const galleryGrid = document.createElement('div');
    galleryGrid.setAttribute('data-api-name', item.category.id);
    galleryContainer.appendChild(galleryGrid);

    const galleryImg = document.createElement('img');
    galleryImg.src = item.imageUrl;
    galleryGrid.appendChild(galleryImg);
    
    const tilteImg = document.createElement('span');
    tilteImg.innerHTML = item.title;
    galleryGrid.appendChild(tilteImg);

    const apiName = item.category.id;
    console.log(apiName);

    })
   }

  // const urlFilter = 'http://localhost:5678/api/categories'

  // async function filterApiName(){
  //   const queryFilter = await fetch(urlFilter, {
  //     method: 'GET'
  //   });

  //   if(!queryFilter.ok){
  //     alert('Un problème est survenu.');
  //   }

  //   else{
  //     const dataFilter = await queryFilter.json();
  //     console.log(dataFilter);

  //     }}; 

  // filterApiName();
 }

recoveryWorks();

function filterGalleryByApiName(apiName) {

  const galleryContainer = document.querySelector('.gallery');
  const galleryItems = galleryContainer.querySelectorAll('div');

  galleryItems.forEach(item => {

    const itemApiName = item.getAttribute('data-api-name');

    if (!apiName.includes(itemApiName)) {
      item.style.display = 'none';
    } 
    
    else {
      item.style.display = 'block';
    }
  });
}

const filterBox = document.querySelector('.filter');

const filterAll = document.createElement('span');
filterAll.classList.add('btnFilter');
filterAll.textContent = 'Tous';
filterBox.appendChild(filterAll);
filterAll.addEventListener('click', () => {
  const apiName = ['1', '2', '3'];
  filterGalleryByApiName(apiName);
});

const filterObject = document.createElement('span');
filterObject.classList.add('btnFilter');
filterObject.textContent = 'Objets';
filterBox.appendChild(filterObject);
filterObject.addEventListener('click', () => {
  const apiName = '1';
  filterGalleryByApiName(apiName);
});

const filterApartment = document.createElement('span');
filterApartment.classList.add('btnFilter');
filterApartment.textContent = 'Appartements';
filterBox.appendChild(filterApartment);
filterApartment.addEventListener('click', () => {
  const apiName = '2';
  filterGalleryByApiName(apiName);
});

const filterHAndR = document.createElement('span');
filterHAndR.classList.add('btnFilter');
filterHAndR.textContent = 'Hôtels & restaurants';
filterBox.appendChild(filterHAndR);
filterHAndR.addEventListener('click', () => {
  const apiName = '3';
  filterGalleryByApiName(apiName);
});




