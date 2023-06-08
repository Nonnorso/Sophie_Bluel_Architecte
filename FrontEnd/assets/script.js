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

    const galleryContainer = document.querySelector('.gallery');

    data.forEach(item => {

    const galleryImg = document.createElement('img');

    galleryImg.src = item.imageUrl;
    galleryContainer.appendChild(galleryImg);
    
    const tilteImg = document.createElement('span');
    tilteImg.innerHTML = item.title;
    galleryContainer.appendChild(tilteImg);
    })
   }
  
 }

 recoveryWorks();
