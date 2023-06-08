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
    let data = await query.json();
    // console.log('data');

    const galleryContainer = document.querySelector('.gallery');
    
    data.forEach(item => {

    const galleryGrid = document.createElement('div');
    galleryContainer.appendChild(galleryGrid);

    const galleryImg = document.createElement('img');
    galleryImg.src = item.imageUrl;
    galleryGrid.appendChild(galleryImg);
    
    const tilteImg = document.createElement('span');
    tilteImg.innerHTML = item.title;
    galleryGrid.appendChild(tilteImg);
    })
   }
  
 }

 recoveryWorks();


