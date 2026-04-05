/**
 * Vinpearl Luxury Nha Trang - Login & Register Logic
 * Features: Real-time validation, Local Storage, Error feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginFormElement');
    const registerForm = document.getElementById('registerFormElement');

    // --- Validation Rules ---
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhone = (phone) => {
        const re = /^[0-9]{10,11}$/;
        return re.test(String(phone));
    };

    const showError = (input, message) => {
        const errorSpan = input.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains('error-msg')) {
            errorSpan.textContent = message;
            errorSpan.classList.remove('d-none');
            input.classList.add('is-invalid');
        }
    };

    const hideError = (input) => {
        const errorSpan = input.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains('error-msg')) {
            errorSpan.classList.add('d-none');
            input.classList.remove('is-invalid');
        }
    };

    // --- Real-time Validation Setup ---
    const setupValidation = (formId) => {
        const form = document.getElementById(formId);
        if (!form) return;

        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateInput(input));
            input.addEventListener('input', () => hideError(input));
        });
    };

    const validateInput = (input) => {
        const val = input.value.trim();
        const type = input.getAttribute('data-type');

        if (!val) {
            showError(input, "Thông tin này không được để trống.");
            return false;
        }

        if (type === 'email-phone') {
            if (!validateEmail(val) && !validatePhone(val)) {
                showError(input, "Định dạng Email hoặc Số điện thoại không hợp lệ.");
                return false;
            }
        } else if (type === 'password' && val.length < 6) {
            showError(input, "Mật khẩu phải có ít nhất 6 ký tự.");
            return false;
        } else if (type === 'confirm-password') {
            const pwd = document.getElementById('regPassword').value;
            if (val !== pwd) {
                showError(input, "Mật khẩu xác nhận không khớp.");
                return false;
            }
        }

        hideError(input);
        return true;
    };

    // --- Handle Login ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            loginForm.querySelectorAll('input').forEach(input => {
                if (!validateInput(input)) isValid = false;
            });

            if (isValid) {
                const identifier = document.getElementById('loginIdentifier').value;
                // Save session info
                localStorage.setItem('currentUser', JSON.stringify({ identifier, loggedIn: true }));
                alert("Đăng nhập thành công!");
                window.location.href = 'home.html';
            }
        });
    }

    // --- Handle Register ---
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            registerForm.querySelectorAll('input').forEach(input => {
                if (!validateInput(input)) isValid = false;
            });

            if (isValid) {
                const identifier = document.getElementById('regIdentifier').value;
                const firstName = document.getElementById('regFirst').value;
                const fullName = document.getElementById('regFull').value;

                const userData = { identifier, firstName, fullName };
                localStorage.setItem('registeredUser', JSON.stringify(userData));

                alert("Đăng ký thành công! Vui lòng đăng nhập.");
                showLogin(); // Call global function to switch tab
            }
        });
    }

    setupValidation('loginFormElement');
    setupValidation('registerFormElement');
});

// Global Toggle Functions (referenced in HTML)
function showRegister() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("tabRegister").classList.add('active-tab');
    document.getElementById("tabLogin").classList.remove('active-tab');
}

function showLogin() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("tabLogin").classList.add('active-tab');
    document.getElementById("tabRegister").classList.remove('active-tab');
}
