// create a key to save data on local storage
const userDataArray = localStorage.getItem('user-data') ? JSON.parse(localStorage.getItem('user-data')) : [];

// initialize variable to execution function
const form = document.querySelector('#contact-form');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const phoneNumberInput = document.querySelector('#phone-number');
const messageInput = document.querySelector('#message');

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
        if (userDataArray.length == 0 && usernameInput.value.trim() != userDataArray) {
            setError(usernameInput, 'Nama pengguna belum terdaftar');
        };

        for (let i = 0; i < userDataArray.length; i++) {
            if (userDataArray[i] != usernameInput.value.trim()) {
                setError(usernameInput, 'Nama pengguna belum terdaftar');
            };
        };

        for (let i = 0; i < userDataArray.length; i++) {
            if (userDataArray[i] == usernameInput.value.trim()) {
                setSuccess(usernameInput);
                localStorage.setItem('username', usernameInput.value);
            };
        };
    };

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
                localStorage.setItem('email-address', emailInput.value);
            };
        };
    };

    // phone number
    if (phoneNumberInput.value.trim() == '') {
        setError(phoneNumberInput, 'Lengkapi nomor telepon');
    } else if (phoneNumberInput.value.trim().length > 13 || phoneNumberInput.value.trim().length < 10) {
        setError(phoneNumberInput, 'Masukkan minimal 10 & maksimal 13 angka');
    } else if (isPhoneNumberValid(phoneNumberInput.value)) {
        checkPhoneNumber();
    } else {
        setError(phoneNumberInput, 'Lengkapi nomor telepon yang valid');
    };

    function checkPhoneNumber() {
        if (phoneNumberInput.value.trim().length < 13 || phoneNumberInput.value.trim().length > 10) {
            setSuccess(phoneNumberInput);
            localStorage.setItem('phone-number', phoneNumberInput.value);
        };
    };

    // message
    if (messageInput.value.trim() == '') {
        setError(messageInput, 'Pesan tidak boleh kosong');
    } else {
        setSuccess(messageInput);
        localStorage.setItem('message', messageInput.value);
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

// regular expression for phone number validation
function isPhoneNumberValid(phoneNumber) {
    const phoneRegex = /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;

    return phoneRegex.test(phoneNumber);
};