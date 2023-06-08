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
    console.log(data);
   }
  
 }

 recoveryWorks();
