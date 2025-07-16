// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.parentElement;
            const productName = product.querySelector('h3').textContent;
            const productPrice = product.querySelector('p:nth-of-type(1)').textContent;
            const productSize = product.querySelector('select').value;

            addToCart(productName, productPrice, productSize);
        });
    });

    function addToCart(name, price, size) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push({ name, price, size });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartDisplay();
    }

    function updateCartDisplay() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartItemsContainer = document.getElementById('cart-items');

        cartItemsContainer.innerHTML = '';

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p>No items in cart.</p>';
        } else {
            cartItems.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>Price: ${item.price}</p>
                    <p>Size: ${item.size}</p>
                    <button class="delete" data-index="${index}">Delete</button>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
        }

        const deleteButtons = document.querySelectorAll('.delete');

        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                deleteFromCart(index);
            });
        });
    }

    function deleteFromCart(index) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartDisplay();
    }

    if (window.location.pathname.endsWith('cart.html')) {
        updateCartDisplay();
    }
});