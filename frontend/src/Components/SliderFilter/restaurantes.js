function mostrarCategoria(categoria) {
  const todasLasListas = document.querySelectorAll('.restaurant-list-sushi, .restaurant-list-carnes, .restaurant-list-hamburguesas, .restaurant-list-pastas');
  const titulo = document.getElementById('categoriaTitulo');
  
  // Verifica si el elemento existe
  if (titulo) {
    if (categoria) {
      // Oculta todas las listas
      todasLasListas.forEach(lista => {
        lista.style.display = 'none';
      });

      // Muestra solo la lista de la categoría seleccionada
      const categoriaSeleccionada = document.querySelector(`.restaurant-list-${categoria}`);
      if (categoriaSeleccionada) {
        categoriaSeleccionada.style.display = 'flex';
      }
      titulo.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
    } else {
      titulo.textContent = "Todas las Categorías";
    }
  } else {
    console.error("Elemento con ID 'categoriaTitulo' no encontrado en el DOM.");
  }
}
