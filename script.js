document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
        validateEmail();
    });

    function validateEmail() {
        const emailValue = emailInput.value.trim();
        if (emailValue === '') {
            emailError.textContent = 'Email is required.';
            return false;
        } else if (!isValidEmail(emailValue)) {
            emailError.textContent = 'Please enter a valid email address.';
            return false;
        } else {
            emailError.textContent = ''; // Clear error message
            return true;
        }
    }

    function isValidEmail(email) {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
