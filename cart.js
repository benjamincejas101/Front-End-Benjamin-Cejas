// Cargar el carrito desde localStorage o inicializarlo vacío
let cart = JSON.parse(localStorage.getItem('tech_cart')) || [];

// Ejecutar cuando el HTML esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Si estamos en la página de productos, activar botones de agregar
    const addButtons = document.querySelectorAll('.btn-add');
    addButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Si estamos en la página del carrito, renderizar la lista
    if (document.getElementById('cart-items')) {
        renderCart();
        document.getElementById('btn-empty').addEventListener('click', emptyCart);
        document.getElementById('btn-checkout').addEventListener('click', checkout);
    }
});

// Función para agregar un producto
function addToCart(e) {
    const button = e.target;
    const id = button.getAttribute('data-id');
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    // Verificar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    saveCart();
    updateCartCount();
    
    // Feedback visual rápido en el botón
    button.textContent = "¡Agregado! ✓";
    button.style.backgroundColor = "#10b981"; // Verde éxito
    setTimeout(() => {
        button.textContent = "Agregar al Carrito";
        button.style.backgroundColor = ""; 
    }, 1000);
}

// Actualizar el número rojo/notificación del menú
function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        countElement.textContent = totalItems;
    }
}

// Guardar en el almacenamiento del navegador
function saveCart() {
    localStorage.setItem('tech_cart', JSON.stringify(cart));
}

// Mostrar los productos en la página de carrito.html
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-message">Tu carrito está vacío. ¡Explorá nuestra tienda!</p>';
        totalElement.textContent = '0.00';
        return;
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemRow = document.createElement('div');
        itemRow.className = 'cart-item-row';
        itemRow.innerHTML = `
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div class="item-actions">
                <span>$${itemTotal.toFixed(2)}</span>
                <button class="btn-remove" onclick="removeItem('${item.id}')">✕</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemRow);
    });

    totalElement.textContent = total.toFixed(2);
}

// Eliminar un producto específico
window.removeItem = function(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartCount();
    renderCart();
};

// Vaciar todo el carrito
function emptyCart() {
    if(cart.length > 0) {
        cart = [];
        saveCart();
        updateCartCount();
        renderCart();
    }
}

// Simular la finalización de compra
function checkout() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }
    alert("¡Gracias por tu compra en Talento Tech! Tu pedido está en procesamiento.");
    emptyCart();
}

// Función para enviar el carrito a Fake Store API
function enviarCarritoA-API(carritoLocal) {
    // Transformamos tu estructura del carrito a lo que espera la API
    const productosAPI = carritoLocal.map(item => ({
        productId: item.id, // Asegúrate de usar la propiedad correcta de tu objeto
        quantity: item.cantidad
    }));

    fetch('https://fakestoreapi.com/carts', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: 5,         // ID de usuario simulado (Fake Store acepta del 1 al 10)
            date: new Date().toISOString().split('T')[0], // Fecha actual (AAAA-MM-DD)
            products: productosAPI
        })
    })
    .then(res => res.json())
    .then(json => {
        console.log("Respuesta de la API (Carrito guardado simulado):", json);
        alert("¡Pedido procesado con éxito (Simulado por API)!");
    })
    .catch(err => console.error("Error al conectar con la API:", err));
}
function actualizarCarritoEnAPI(idCarrito, carritoLocal) {
    const productosAPI = carritoLocal.map(item => ({
        productId: item.id,
        quantity: item.cantidad
    }));

    fetch(`https://fakestoreapi.com/carts/${idCarrito}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: 3,
            date: new Date().toISOString().split('T')[0],
            products: productosAPI
        })
    })
    .then(res => res.json())
    .then(json => console.log("Carrito actualizado en API:", json));
}
async function cargarCarritoDesdeAPI() {
    try {
        // Traemos el carrito número 2 de la API de ejemplo
        const resCart = await fetch('https://fakestoreapi.com/carts/2');
        const cartData = await resCart.json();
        
        const infoCompletaProductos = [];

        // Recorremos los productos que devolvió el carrito para buscar sus nombres, imágenes y precios
        for (let item of cartData.products) {
            const resProd = await fetch(`https://fakestoreapi.com/products/${item.productId}`);
            const prodData = await resProd.json();
            
            // Combinamos la info del producto con la cantidad del carrito
            infoCompletaProductos.push({
                id: prodData.id,
                titulo: prodData.title,
                precio: prodData.price,
                imagen: prodData.image,
                cantidad: item.quantity
            });
        }

        console.log("Tu carrito listo para renderizar:", infoCompletaProductos);
        // Aquí llamarías a tu función existente para renderizar el HTML del carrito
        // renderizarCarrito(infoCompletaProductos);

    } catch (error) {
        console.error("Error cargando datos iniciales del carrito:", error);
    }
}