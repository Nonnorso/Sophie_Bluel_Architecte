function createFilters (categoryId, text) {
    let button = document.createElement('button')
    button.setAttribute('data-cat-id', categoryId)
    button.textContent = text
    button.classList.add('btnFilter')
    button.classList.add('btnFilter:hover')

    return button
}

export { createFilters }