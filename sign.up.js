// create a key to save data on local storage
const userDataArray = localStorage.getItem('user-data') ? JSON.parse(localStorage.getItem('user-data')) : [];

// initialize variable to execution function
const form = document.querySelector('#sign-up-form');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');

// form validation
form.addEventListener('submit', (event) => {
    // validatian data input
    validateForm();

    // checking validation
    if (isFormValid() == true) {
        // executed data input
        form.submit();
        // create function to save data input on local storage
        createUserData();
    } else {
        // hold page if data input not completed
        event.preventDefault();
    };
});

// get result and run form to the next page if validation are valid
function isFormValid() {
    const inputContainers = form.querySelectorAll('.input-section');
    let result = true;
    // checking error
    inputContainers.forEach((container) => {
        if (container.classList.contains('error')) {
            result = false;
        };
    });
    return result;
};

// executed validation data input
function validateForm() {
    // username 
    if (usernameInput.value.trim() == '') {
        setError(usernameInput, 'Nama pengguna tidak boleh kosong');
    } else if (usernameInput.value.trim().length < 3 || usernameInput.value.trim().length > 15) {
        setError(usernameInput, 'Masukkan minimal 3 & maksimal 15 karakter');
    } else {
        setSuccess(usernameInput);
        checkUsernameAccount();
    };

    function checkUsernameAccount() {
        for (let i = 0; i < userDataArray.length; i++) {
            if (userDataArray[i] == usernameInput.value.trim()) {
                setError(usernameInput, 'Nama pengguna sudah terdaftar');
            };
        };
    };

    // email
    if (emailInput.value.trim() == '') {
        setError(emailInput, 'Lengkapi alamat email');
    } else if (isEmailValid(emailInput.value)) {
        setSuccess(emailInput);
        checkEmailAccount();
    } else {
        setError(emailInput, 'Masukkan alamat email yang valid');
    };

    function checkEmailAccount() {
        for (let i = 0; i < userDataArray.length; i++) {
            if (userDataArray[i] == emailInput.value) {
                setError(emailInput, 'Alamat email sudah terdaftar');
            };
        };
    };

    // password
    if (passwordInput.value.trim() == '') {
        setError(passwordInput, 'Kata sandi tidak boleh kosong');
    } else if (passwordInput.value.trim().length < 6 || passwordInput.value.trim().length > 20) {
        setError(passwordInput, 'Masukkan minimal 6 & maksimal 20 karakter');
    } else {
        setSuccess(passwordInput);
    };

    // confirm password
    if (confirmPasswordInput.value.trim() == '') {
        setError(confirmPasswordInput, 'Konfirmasi kata sandi tidak boleh kosong');
    } else if (confirmPasswordInput.value != passwordInput.value) {
        setError(confirmPasswordInput, 'Konfirmasi kata sandi tidak cocok');
    } else {
        setSuccess(confirmPasswordInput);
    };
};

// show error notification on data input
function setError(element, errorMessage) {
    const parent = element.parentElement;
    parent.classList.add('error');
    if (parent.classList.contains('success')) {
        parent.classList.remove('success');
    };
    const small = parent.querySelector('small');
    small.textContent = errorMessage;
};

// show success notification on data input
function setSuccess(element) {
    const parent = element.parentElement;
    if (parent.classList.contains('error')) {
        parent.classList.remove('error');
    };
    parent.classList.add('success');
};

// regular expression for email validation
function isEmailValid(email) {
    const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
};

// save user data input on local storage
function createUserData() {
    userDataArray.push(usernameInput.value, emailInput.value, passwordInput.value, confirmPasswordInput.value);
    localStorage.setItem('user-data', JSON.stringify(userDataArray));
};

// hide and show checkbox onclick
function showPassword() {
    if (passwordInput.type == 'password' && confirmPasswordInput.type == 'password') {
        passwordInput.type = 'text';
        confirmPasswordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
        confirmPasswordInput.type = 'password';
    };
};