import { createFilters } from './factory/createFilters.js'
import { createWorks } from './factory/createWorks.js'

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
        item.title
    ))

  })
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

  })
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