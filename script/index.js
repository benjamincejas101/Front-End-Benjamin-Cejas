document.addEventListener('DOMContentLoaded', () => {
    cargarProductosDestacados();
});

function cargarProductosDestacados() {
    const contenedor = document.getElementById('contenedor-destacados');
    if (!contenedor) return;

    // Traemos los productos de la API
    fetch('https://fakestoreapi.com/products?limit=12')
        .then(res => res.json())
        .then(productos => {
            contenedor.innerHTML = ''; // Limpiamos cualquier texto previo

            productos.forEach(producto => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add('product-card'); // Usa tus estilos compactos

                tarjeta.innerHTML = `
                    <div class="product-image-container">
                        <img src="${producto.image}" alt="${producto.title}" class="product-img">
                    </div>
                    <div class="product-info">
                        <h3>${producto.title}</h3>
                        <p class="price">$${producto.price}</p>
                        <button class="btn-add">Agregar al Carrito</button>
                    </div>
                `;
                contenedor.appendChild(tarjeta);
            });
        })
        .catch(error => console.error('Error cargando la API:', error));
}