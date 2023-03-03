// set and save data to local storage
const userDataArray = localStorage.getItem('user-data') ? JSON.parse(localStorage.getItem('user-data')) : [];

// initialize variable
const form = document.querySelector('#checkout-form');
const usernameInput = document.querySelector('#username');
const phoneNumberInput = document.querySelector('#phone-number');
const emailInput = document.querySelector('#email');
const paymentMethodSelect = document.querySelector('#payment-method');
const provinceInput = document.querySelector('#province');
const cityInput = document.querySelector('#city');
const addressInput = document.querySelector('#address');
const districtInput = document.querySelector('#district');
const subdistrictInput = document.querySelector('#subdistrict');
const postalCodeInput = document.querySelector('#postal-code');

// form submission
form.addEventListener('submit', (event) => {
    // create function to validation
    validateForm();

    // checking data form
    if (isFormValid() == true) {
        form.submit();
    } else {
        // hold in this page if data not completed
        event.preventDefault();
    };
});

// get result and run form if validation are valid
function isFormValid() {
    // initialize variable
    const inputContainers = form.querySelectorAll('.input-section');
    let result = true;
    // looping result for checking error
    inputContainers.forEach((container) => {
        if (container.classList.contains('error')) {
            result = false;
        };
    });
    return result;
};

// set validation form
function validateForm() {
    // username validation check
    if (usernameInput.value.trim() == '') {
        setError(usernameInput, 'Nama pemesan tidak boleh kosong');
    } else if (usernameInput.value.trim().length < 3 || usernameInput.value.trim().length > 15) {
        setError(usernameInput, 'Masukkan minimal 3 & maksimal 15 karakter');
    } else {
        // if username not yet on local storage
        setSuccess(usernameInput);
        // create a new local storage to display username on order page
        localStorage.setItem('check-out-name', usernameInput.value);
    };

    // phone number validation check
    if (phoneNumberInput.value.trim() == '') {
        setError(phoneNumberInput, 'Lengkapi nomor telepon');
    } else if (phoneNumberInput.value.trim().length > 13 || phoneNumberInput.value.trim().length < 10) {
        setError(phoneNumberInput, 'Phone number must be min 10 and max 13 digits');
    } else if (isPhoneNumberValid(phoneNumberInput.value)) {
        checkPhoneNumber();
    } else {
        setError(phoneNumberInput, 'Provide valid phone number');
    };

    // activated function
    function checkPhoneNumber() {
        if (phoneNumberInput.value.trim().length < 13 || phoneNumberInput.value.trim().length > 10) {
            setSuccess(phoneNumberInput);
            // create a new local storage to display phone number on order page
            localStorage.setItem('checkout-phone-number', phoneNumberInput.value);
        };
    };

    // email validation check
    if (emailInput.value.trim() == '') {
        setError(emailInput, 'Provide email address');
    } else if (isEmailValid(emailInput.value)) {
        // create function to check if email has been on local storage
        checkEmailAccount();
    } else {
        setError(emailInput, 'Provide valid email address');
    };

    // activated function
    function checkEmailAccount() {
        // check email address on local storage
        if (userDataArray.length == 0 && emailInput.value.trim() != userDataArray) {
            setError(emailInput, 'Email address does not registered');
        };
        // set error message if not yet
        for (let i = 0; i < userDataArray.length; i++) {
            if (userDataArray[i] != emailInput.value) {
                setError(emailInput, 'Email address does not registered');
            };
        };
        // set success if has been saved
        for (let i = 0; i < userDataArray.length; i++) {
            if (userDataArray[i] == emailInput.value) {
                setSuccess(emailInput);
                // create a new local storage to display email on order page
                localStorage.setItem('checkout-email-address', emailInput.value);
            };
        };
    };

    // payment method validation check
    if (paymentMethodSelect.value == 'Pilih Jenis Pembayaran') {
        setError(paymentMethodSelect, 'Anda belum memilih jenis pembayaran')
    } else {
        setSuccess(paymentMethodSelect);
        // create a new local storage to display payment method on order page
        localStorage.setItem('checkout-payment-method', paymentMethodSelect.value);
    }

    // provinces validation check
    if (provinceInput) {
        setSuccess(provinceInput);
        // create a new local storage to display province on order page
        localStorage.setItem('checkout-province', provinceInput.value);
    };

    // cities validation check
    if (cityInput) {
        setSuccess(cityInput);
        // create a new local storage to display city on order page
        localStorage.setItem('checkout-city', cityInput.value);
    };

    // address validation check
    if (addressInput.value.trim() == '') {
        setError(addressInput, 'Lengkapi alamat pengiriman');
    } else if (addressInput.value.trim().length < 20) {
        setError(addressInput, 'Masukkan minimal 20 karakter');
    } else {
        setSuccess(addressInput);
        // create a new local storage to display address on order page
        localStorage.setItem('checkout-address', addressInput.value);
    };

    // district validation check
    const selectedDistrict = districtInput.value;
    if (selectedDistrict === '') {
        setError(districtInput, 'Provide district');
    } else if (!document.querySelector(`#district-list option[value='${selectedDistrict}']`)) {
        setError(districtInput, 'Provide valid district');
    } else {
        setSuccess(districtInput);
        // create a new local storage to display district on order page
        localStorage.setItem('checkout-district', districtInput.value);
    };

    // subdistrict validation check
    const selectedSubDistrict = subdistrictInput.value
    if (selectedSubDistrict === '') {
        setError(subdistrictInput, 'Provide subdistrict')
    } else if (!document.querySelector(`#subdistrict-list option[value='${selectedSubDistrict}']`)) {
        setError(subdistrictInput, 'Provide valid subdistrict')
    } else {
        setSuccess(subdistrictInput)
        // create a new local storage to display subdistrict on order page
        localStorage.setItem('checkout-subdistrict', subdistrictInput.value);
    }

    // postal code validation check
    const selectedPostalCode = postalCodeInput.value;
    if (selectedPostalCode === '') {
        setError(postalCodeInput, 'Provide postal code');
    } else if (!document.querySelector(`#postal-code-list option[value='${selectedPostalCode}']`)) {
        setError(postalCodeInput, 'Provide valid postal code');
    } else {
        setSuccess(postalCodeInput);
        // create a new local storage to display postal code on order page
        localStorage.setItem('checkout-postal-code', postalCodeInput.value);
    };

};

// show error notification
function setError(element, errorMessage) {
    const parent = element.parentElement;
    parent.classList.add('error');
    if (parent.classList.contains('success')) {
        parent.classList.remove('success');
    };
    const paragraph = parent.querySelector('small');
    paragraph.textContent = errorMessage;
};

// show success notification
function setSuccess(element) {
    const parent = element.parentElement;
    if (parent.classList.contains('error')) {
        parent.classList.remove('error');
    };
    parent.classList.add('success');
};

// email is valid if this
function isEmailValid(email) {
    const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return reg.test(email);
};

// phone number is valid if this
function isPhoneNumberValid(phoneNumber) {
    const phoneRegex = /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;

    return phoneRegex.test(phoneNumber);
};