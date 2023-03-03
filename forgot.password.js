// create a key to save data on local storage
const userDataArray = localStorage.getItem('user-data') ? JSON.parse(localStorage.getItem('user-data')) : [];

// initialize variable to execution function
const form = document.querySelector('#forgot-password-form');
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
    // email
    if (emailInput.value.trim() == '') {
        setError(emailInput, 'Lengkapi alamat email');
    } else if (isEmailValid(emailInput.value)) {
        checkEmailAccount();
    } else {
        setError(emailInput, 'Lengkapi alamat email yang valid');
    };

    function checkEmailAccount() {
        if (userDataArray.length == 0 && emailInput.value.trim() != userDataArray) {
            setError(emailInput, 'Alamat email belum terdaftar');
        };

        for (let i = 0; i < userDataArray.length; i++) {
            if (userDataArray[i] != emailInput.value) {
                setError(emailInput, 'Alamat email belum terdaftar');
            };
        };

        for (let i = 0; i < userDataArray.length; i++) {
            if (userDataArray[i] == emailInput.value) {
                setSuccess(emailInput);
            };
        };
    };

    // password 
    if (passwordInput.value.trim() == '') {
        setError(passwordInput, 'Kata sandi tidak boleh kosong');
    } else if (passwordInput.value.trim().length < 6 || passwordInput.value.trim().length > 20) {
        setError(passwordInput, 'Masukkan minimal 6 & maksimal 20 karakter');
    } else {
        // menambah password baru kedalam array untuk disimpan di local storage
        userDataArray.push(passwordInput.value);
        setSuccess(passwordInput);
        localStorage.setItem('user-data', JSON.stringify(userDataArray));
    };

    // confirm password
    if (confirmPasswordInput.value.trim() == '') {
        setError(confirmPasswordInput, 'Konfirmasi kata sandi tidak boleh kosong');
    } else if (confirmPasswordInput.value != passwordInput.value) {
        setError(confirmPasswordInput, 'Konfirmasi kata sandi tidak cocok');
    } else {
        userDataArray.push(confirmPasswordInput.value);
        setSuccess(confirmPasswordInput);
        localStorage.setItem('user-data', JSON.stringify(userDataArray));
    };
};

// show error notification on data input
function setError(element, errorMessage) {
    const parent = element.parentElement;
    parent.classList.add('error');
    if (parent.classList.contains('success')) {
        parent.classList.remove('success');
    };
    const paragraph = parent.querySelector('small');
    paragraph.textContent = errorMessage;
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