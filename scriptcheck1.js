// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const card = document.getElementById('card').value;

        if (validateCard(card)) {
            // Proceed with form submission
            alert('Order placed successfully!');
            window.location.href = 'confirmation.html';
        } else {
            alert('Invalid credit card number.');
        }
    });

    function validateCard(cardNumber) {
        // Simple Luhn algorithm for credit card validation
        let sum = 0;
        for (let i = 0; i < cardNumber.length; i++) {
            let digit = parseInt(cardNumber[i]);

            if ((cardNumber.length - i) % 2 === 0) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
        }

        return sum % 10 === 0;
    }
});