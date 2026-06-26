document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrito();
});

// Función principal para dibujar los productos seleccionados
function renderizarCarrito() {
    const contenedor = document.getElementById('contenedor-carrito'); 
    const totalElemento = document.getElementById('total-carrito');
    const contadorNavbar = document.getElementById('cart-count');

    if (!contenedor) return;

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // CASO A: Si el carrito está vacío
    if (carrito.length === 0) {
        contenedor.innerHTML = '<p style="text-align:center; padding: 20px; color: #fff;">Tu carrito está vacío.</p>';
        if (totalElemento) totalElemento.textContent = '0.00';
        if (contadorNavbar) contadorNavbar.textContent = '0';
        return;
    }

    // CASO B: Si el carrito tiene productos
    contenedor.innerHTML = ""; 
    let totalAcumulado = 0;
    let cantidadTotalProductos = 0;

    // Dibujamos cada producto en la pantalla
    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        totalAcumulado += subtotal;
        cantidadTotalProductos += producto.cantidad;

        const div = document.createElement("div");
        div.classList.add("carrito-item"); 
        
        div.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; background: rgba(255,255,255,0.1); padding: 15px; border-radius: 12px; backdrop-filter: blur(8px);">
                <img src="${producto.imagen}" alt="${producto.titulo}" style="width: 60px; height: 60px; object-fit: contain; margin-right: 15px; background: white; border-radius: 8px; padding: 5px;">
                <div style="flex-grow: 1; margin-right: 15px;">
                    <h4 style="margin: 0; color: #0f172a; font-size: 1rem; font-weight: 600;">${producto.titulo}</h4>
                    <p style="margin: 5px 0 0 0; color: #ff7b00; font-weight: bold;">$${producto.precio} x ${producto.cantidad}</p>
                </div>
                <div style="text-align: right; margin-right: 15px;">
                    <p style="margin: 0 0 5px 0; font-weight: bold; color: #0f172a;">$${subtotal.toFixed(2)}</p>
                </div>
                <button onclick="eliminarDelCarrito(${producto.id})" style="background: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 20px; cursor: pointer; font-weight: 600;">
                    Eliminar
                </button>
            </div>
        `;
        contenedor.appendChild(div);
    });

    // Agregar el botón de Finalizar Compra abajo del todo si hay productos
    const divAcciones = document.createElement("div");
    divAcciones.style.textAlign = "center";
    divAcciones.style.marginTop = "25px";
    divAcciones.innerHTML = `
        <button onclick="finalizarCompra()" class="btn-primary" style="background: linear-gradient(135deg, #ff7b00, #ffae00); border: none; padding: 14px 40px; font-weight: bold; border-radius: 30px; font-size: 1.1rem; cursor: pointer; color: white; box-shadow: 0 4px 15px rgba(255,123,0,0.3);">
            Finalizar Compra
        </button>
    `;
    contenedor.appendChild(divAcciones);

    // Actualizamos los textos de los totales de forma segura
    if (totalElemento) totalElemento.textContent = totalAcumulado.toFixed(2);
    if (contadorNavbar) contadorNavbar.textContent = cantidadTotalProductos;
}

// Función para quitar un producto del carrito
window.eliminarDelCarrito = function(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
};

// Función para procesar el pago ficticio
window.finalizarCompra = function() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos desde el catálogo.");
        return;
    }
    alert("¡Muchas gracias por tu simulación de compra en Talento Tech! Limpiando carrito...");
    localStorage.removeItem('carrito');
    renderizarCarrito(); // Redibuja el carrito vacío instantáneamente
};