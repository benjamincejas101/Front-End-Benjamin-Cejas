document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrito();
});

function renderizarCarrito() {
    const contenedor = document.getElementById('contenedor-carrito'); // Buscará este ID en tu carrito.html
    const totalElemento = document.getElementById('total-carrito');
    if (!contenedor) return;

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p style="text-align:center; padding: 20px;">Tu carrito está vacío.</p>';
        if (totalElemento) totalElemento.textContent = '0.00';
        actualizarContadorNavbar();
        return;
    }

    contenedor.innerHTML = '';
    let totalAcumulado = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        totalAcumulado += subtotal;

        const fila = document.createElement('div');
        fila.style.display = 'flex';
        fila.style.justify = 'space-between';
        fila.style.alignItems = 'center';
        fila.style.padding = '15px';
        fila.style.borderBottom = '1px solid #e2e8f0';
        fila.style.backgroundColor = '#fff';
        fila.style.margin = '10px 0';
        fila.style.borderRadius = '8px';

        fila.innerHTML = `
            <div style="display:flex; align-items:center; gap:15px;">
                <img src="${item.imagen}" alt="${item.titulo}" style="width:50px; height:50px; object-fit:contain;">
                <div>
                    <h4 style="font-size:0.95rem; max-width:300px; margin:0;">${item.titulo}</h4>
                    <small style="color:#64748b;">$${item.precio} x ${item.cantidad}</small>
                </div>
            </div>
            <div style="display:flex; align-items:center; gap:20px;">
                <strong style="color:#0f172a;">$${subtotal.toFixed(2)}</strong>
                <button onclick="eliminarDelCarrito(${item.id})" style="background-color:#ef4444; color:white; border:none; padding:6px 12px; border-radius:6px; cursor:pointer;">
                    Eliminar
                </button>
            </div>
        `;
        contenedor.appendChild(fila);
    });

    if (totalElemento) totalElemento.textContent = totalAcumulado.toFixed(2);
    actualizarContadorNavbar();
}

window.eliminarDelCarrito = function(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
};

function actualizarContadorNavbar() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const contador = document.getElementById('cart-count');
    if (contador) contador.textContent = total;
}