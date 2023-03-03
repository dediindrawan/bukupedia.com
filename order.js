function displaDetailOrder() {
    const dayIndex = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu',];
    const monthIndex = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    let orderName = document.querySelector('.order-name');
    let orderPhone = document.querySelector('.order-phone');
    let orderEmail = document.querySelector('.order-email');
    let orderPaymentMethod = document.querySelector('.order-payment-method');
    let orderAddress = document.querySelector('.order-adrress');
    // let orderItem = document.querySelector('.order-item');
    // let orderPrice = document.querySelector('.order-price');
    // let orderStatus = document.querySelector('.order-status');

    let thisDate = document.querySelector('.order-date'),
        date = new Date(), day, dates, month, year;
    day = dayIndex[date.getDay()];
    dates = date.getDate();
    month = monthIndex[date.getMonth()];
    year = date.getFullYear();

    dates = dates < 10 ? '0' + dates : dates;

    if (localStorage.getItem('checkout-address') == null) {
        orderAddress.innerHTML = '';
    } else {
        thisDate.innerHTML = `${day}, ${dates} - ${month} - ${year}`;

        orderAddress.innerHTML = localStorage.getItem('checkout-address') + ' ' + localStorage.getItem('checkout-subdistrict') + ', ' + localStorage.getItem('checkout-district') + ', ' + localStorage.getItem('checkout-city') + ' - ' + localStorage.getItem('checkout-province') + ' ' + localStorage.getItem('checkout-postal-code');
        orderName.innerHTML = localStorage.getItem('check-out-name');
        orderPhone.innerHTML = localStorage.getItem('checkout-phone-number');
        orderEmail.innerHTML = localStorage.getItem('checkout-email-address');
        orderPaymentMethod.innerHTML = localStorage.getItem('checkout-payment-method');
    }



};
displaDetailOrder();