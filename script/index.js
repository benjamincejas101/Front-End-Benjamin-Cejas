document.addEventListener('DOMContentLoaded', () => {
    // Solo ejecutamos si existe el contenedor de destacados (Página de Inicio)
    if (document.getElementById('contenedor-destacados')) {
        cargarProductosDestacados();
    }
    
    // Configuración del menú hamburguesa segura
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');
    if (hamburger && navbar) {
        hamburger.addEventListener('click', () => {
            navbar.classList.toggle('show');
        });
    }
});

function cargarProductosDestacados() {
    const contenedor = document.getElementById('contenedor-destacados');
    if (!contenedor) return;

    fetch('https://fakestoreapi.com/products?limit=4') // Traemos solo 4 para el Inicio
        .then(res => res.json())
        .then(productos => {
            contenedor.innerHTML = ''; 
            productos.forEach(producto => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add('product-card'); 

                // CORRECCIÓN CRÍTICA: En el inicio también usamos la función agregarAlCarrito de productos.js
                tarjeta.innerHTML = `
                    <div class="product-image-container">
                        <img src="${producto.image}" alt="${producto.title}" class="product-img">
                    </div>
                    <div class="product-info">
                        <h3>${producto.title}</h3>
                        <p class="price">$${producto.price}</p>
                        <button onclick="agregarAlCarrito(${producto.id}, '${producto.title.replace(/'/g, "\\'")}', ${producto.price}, '${producto.image}')" class="btn-add">
                            Agregar al Carrito
                        </button>
                    </div>
                `;
                contenedor.appendChild(tarjeta);
            });
        })
        .catch(error => console.error('Error cargando destacados:', error));
}