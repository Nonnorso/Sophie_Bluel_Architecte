function createFilters (categoryId, text) {
    let button = document.createElement('button')
    button.setAttribute('data-cat-id', categoryId)
    button.textContent = text

    return button
}

export { createFilters }