// hide and show wrapper-header-top, wrapper-navbar, and back-to-top when user scroll page up and down
let lastScrollUp = 0;
const wrapperHeaderTop = document.querySelector('.wrapper-header-top');
const wrapperNavbar = document.querySelector('.wrapper-navbar');
const backToTop = document.querySelector('.back-to-top');

// add event scroll page up and down
window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollUp) {
        wrapperHeaderTop.style.top = '-50px'; // hide areas
        wrapperNavbar.style.top = '0'; // swipe and stay to top
        backToTop.style.bottom = '-80px'; // hide button
    } else {
        wrapperHeaderTop.style.top = '0'; // show areas
        wrapperNavbar.style.top = '50px'; // swipe and back to starting position
        backToTop.style.bottom = '30px'; // show button
    };
    lastScrollUp = scrollTop;
});

// discover more button onclick
function btnDiscoverMore() {
    window.location.href = '#latest-product';
};

// search icon onclick
function searchIcon() {
    window.location.href = 'search.html';
};

// user icon onclick
function userIcon() {
    document.getElementById('user-account-box').classList.toggle('show-user-account-box');
    displayUserAcCount();
};

// cart icon onclick
function cartIcon() {
    window.location.href = 'cart.html';
};

// toggle icon onclick
function toggleIcon() {
    document.getElementById('navigation-item').classList.toggle('show-nav-item');
};

// close nav item onclick everywhere on window
window.onclick = function (event) {
    if (!event.target.matches('.toggle-icon')) {
        let dropItem = document.getElementsByClassName('nav-item');
        let i;
        for (i = 0; i < dropItem.length; i++) {
            let openDropItem = dropItem[i];
            if (openDropItem.classList.contains('show-nav-item')) {
                openDropItem.classList.remove('show-nav-item');
            };
        };
    };
};

// create function to display user detail when user icon onclick
function displayUserAcCount() {
    const userAvatar = document.querySelector('.user-avatar');
    const cameraIcon = document.querySelector('.camera-icon');
    const username = document.querySelector('.username');
    const email = document.querySelector('.email');
    const btnSignOut = document.querySelector('.btn-sign-out');

    // if user not sign in their account
    if (localStorage.getItem('username') == null && localStorage.getItem('email-address') == null) {
        userAvatar.style.display = 'none';
        cameraIcon.style.display = 'none';
        username.innerHTML =
            `<div style="text-align: center;">
                <span style="text-transform: none;"><i class="fa-solid fa-face-frown" style="font-size: 3rem;"></i> <br> Sepertinya kamu belum masuk. Silakan masuk, atau registrasi untuk akun baru.</span>
            <div>`;
        email.style.display = 'none';
        btnSignOut.style.display = 'none';
    } else {
        username.innerHTML = 'Hi, ' + localStorage.getItem('username'); // display username data transit taking from local storage after user signed in account 
        email.innerHTML = 'Email: ' + localStorage.getItem('email-address'); // display email data transit taking from local storage after user signed in account
        btnSignOut.style.display = 'block';
    };

    // add event when sign out button onclick by user
    btnSignOut.addEventListener('click', function (event) {
        event.preventDefault();
        if (localStorage.getItem('username') != null && localStorage.getItem('email-address') != null) {
            localStorage.removeItem('username'); // remove username data transit on local storage after user signed in account 
            localStorage.removeItem('email-address'); // remove email data transit on local storage after user signed in account 
            userAvatar.style.display = 'none';
            cameraIcon.style.display = 'none';
            username.style.display = 'none';
            email.innerHTML =
                `<div style="text-align: center;">
                    <span>Berhasil keluar.</span>
                <div>`;
            btnSignOut.style.display = 'none';
            location.reload();
        };
    });

    // initialize variable to uploading profile picture
    const fileInput = document.getElementById('image-upload');
    const image = document.getElementById('my-image');

    // add event on file input
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        // add event listener to file reader
        reader.addEventListener('load', () => {
            const imageDataURL = reader.result;
            localStorage.setItem('myImage', imageDataURL); // save image data on local storage
            image.src = imageDataURL;
        });

        // read the file as a data URL
        reader.readAsDataURL(file);
    });

    // Check if image data exists in local storage when the page loads
    window.addEventListener('load', () => {
        const imageDataURL = localStorage.getItem('myImage');
        if (imageDataURL) {
            image.src = imageDataURL;
        } else {
            image.src = 'https://image.pngaaa.com/468/81468-middle.png';
        };
    });
};

// load more button onclick
function btnLoadMore() {
    window.location.href = 'shop.html';
};

// read more button onclick
function btnReadMore() {
    window.location.href = 'about.html';
};

// contact button onclick
function btnContact() {
    window.location.href = 'contact.html';
};

// display the year on copyright
function displayCopyright() {
    let years = document.querySelector('.years'),
        date = new Date(), year;
    year = date.getFullYear();

    years.innerHTML = `${year}`;
};
displayCopyright();