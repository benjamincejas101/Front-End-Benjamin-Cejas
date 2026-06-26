document.addEventListener('DOMContentLoaded', () => {
    cargarTodosLosProductos();
    actualizarContadorNavbar();
});

// Función para traer TODO el catálogo de la Fake Store API
function cargarTodosLosProductos() {
    const contenedor = document.getElementById('contenedor-productos'); 
    if (!contenedor) return;

    contenedor.innerHTML = '<p style="text-align:center; width:100%; color:#fff;">Cargando catálogo completo...</p>';

    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(productos => {
            contenedor.innerHTML = ''; 

            productos.forEach(producto => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add('product-card'); 

                // .replace(/'/g, "\\'") evita que las comillas de los títulos rompan el código del botón
                const tituloSeguro = producto.title.replace(/'/g, "\\'");

                tarjeta.innerHTML = `
                    <div class="product-image-container">
                        <img src="${producto.image}" alt="${producto.title}" class="product-img">
                    </div>
                    <div class="product-info">
                        <h3>${producto.title}</h3>
                        <p class="price">$${producto.price}</p>
                        <button onclick="agregarAlCarrito(${producto.id}, '${tituloSeguro}', ${producto.price}, '${producto.image}')" class="btn-add">
                            Agregar al Carrito
                        </button>
                    </div>
                `;
                contenedor.appendChild(tarjeta);
            });
        })
        .catch(error => {
            console.error("Error al conectar con la API:", error);
            contenedor.innerHTML = `<p style='color: red; text-align: center;'>Error al cargar los productos.</p>`;
        });
}

// Lógica global para guardar en LocalStorage
window.agregarAlCarrito = function(id, titulo, precio, imagen) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        // Guardamos las propiedades en español
        carrito.push({ id, titulo, precio, imagen, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorNavbar();
    alert(`¡${titulo} fue agregado al carrito!`);
};

function actualizarContadorNavbar() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const contador = document.getElementById('cart-count');
    if (contador) contador.textContent = total;
}