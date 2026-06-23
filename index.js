document.addEventListener('DOMContentLoaded', () => {
    cargarProductosDestacados();
    actualizarContadorNavbar();
});

// Función para traer productos de electrónica de Fake Store API
function cargarProductosDestacados() {
    const contenedor = document.getElementById('contenedor-destacados');
    if (!contenedor) return; 

    // Consultamos la API pública
    // Usar esto en la pantalla de catálogo completo (trae los 20 productos totales de la API)
fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(productos => {
            contenedor.innerHTML = ''; // Limpiamos el cargando...

            productos.forEach(producto => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add('product-card'); // Usa tu clase de CSS existente

                tarjeta.innerHTML = `
                    <div class="product-image-container">
                        <img src="${producto.image}" alt="${producto.title}" class="product-img">
                    </div>
                    <div class="product-info">
                        <h3>${producto.title}</h3>
                        <p class="price">$${producto.price}</p>
                        <button onclick="agregarAlCarrito(${producto.id})" class="btn-add">
                            Agregar al Carrito
                        </button>
                    </div>
                `;
                contenedor.appendChild(tarjeta);
            });
        })
        .catch(error => {
            console.error('Error cargando destacados:', error);
            contenedor.innerHTML = '<p style="text-align:center; width:100%;">Error al cargar los productos.</p>';
        });
}

// Lógica para actualizar el número del carrito leyendo el LocalStorage
function actualizarContadorNavbar() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    
    const contador = document.getElementById('cart-count');
    if (contador) {
        contador.textContent = totalProductos;
    }
}

// Función global simulada para agregar productos (para que no de error el botón)
window.agregarAlCarrito = function(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Verificamos si ya existe el producto en el carrito
    const itemExistente = carrito.find(item => item.id === id);
    
    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({ id: id, cantidad: 1 });
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorNavbar();
    alert("¡Producto añadido al carrito!");
}
