var id = 0;

function request(url, method, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(this.responseText));
        }
    };
    xhttp.open(method, url, true);
    xhttp.send();
}
request('https://c0a69d0c-f9ef-4ef7-be6a-f39493b8af03.mock.pstmn.io/cameras2', 'GET', loadCameras);

function loadCameras(data) {
    console.log(data);
    var camerasContainer = document.getElementById('camerasContainer');
    let camerasData = '';
    let reserveOnlyOption = '<div>Reserve only</div>';

    for (let i = 0; i < data.cameras.length; i++) {
        camerasData += (
            '<article class="singleCamera">' +
            '<div class="img-container">' +
            '<img src="images/' + data.cameras[i].camera_image + '"' + 'alt="product" class="product-img">' +
            '<div class="overlay">' +
            '<div>' +
            '<p class="description">' +
            "Type: " + data.cameras[i].camera_type + '<br>' +
            "Color: " + data.cameras[i].camera_color + '<br>' +
            "Manifacturer: " + data.cameras[i].camera_manifacturer + '<br>' +
            '</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="cameraInfo">' +
            '<h2 class="cameraName">' + data.cameras[i].camera_name + '</h2>' +
            '<h3 class="cameraPrice">' + data.cameras[i].camera_price + " $" + '</h3>');

        if (data.cameras[i].camera_price > 300) {
            camerasData += reserveOnlyOption;
        }

        camerasData += (
            '<button class="btn btn-primary shop-item-button" type="button"><i class="fa fa-shopping-cart"></i> Add to cart </button>' +
            '</div>' +
            '</article>');

    };
    camerasContainer.innerHTML = camerasData;
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var daysInputs = document.getElementsByClassName('cart-reserve-days-input')
    for (var i = 0; i < daysInputs.length; i++) {
        var input = daysInputs[i]
        input.addEventListener('change', daysChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {

    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function daysChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function itemReserve() {
    var checkbox = document.getElementsByClassName('cart-checkbox-input')
    if (checkbox[0].value == "on") {
        var daysInputs = document.getElementsById();
        daysInputs.value = 1
    }
    else {
        checkbox.value = 0;
    }

    updateCartTotal();
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('cameraName')[0].innerText
    var price = shopItem.getElementsByClassName('cameraPrice')[0].innerText
    addItemToCart(title, price)
    updateCartTotal()
}

function addItemToCart(title, price) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-camera-name')
    var priceToNumber = parseInt(price, 10);

    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var checkboxReserve = '<div class="cart-checkbox cart-column"> <input id=' + id + ' class="cart-checkbox-input" type="checkbox" onclick="itemReserve()"> </div>';
    var checkboxReserveNotAllowed = '<div class="cart-checkbox cart-column"> </div>'
    var cartRowContents = `
        <div class="cart-item cart-column">
            <span class="cart-camera-name">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-input cart-quantity-input" type="number" value="1"> 
        </div>`;

    if (priceToNumber < 300) {
        cartRowContents += checkboxReserve;
    } else {
        cartRowContents += checkboxReserveNotAllowed;
    }

    let reserveOnly = `
        <div class="cart-days cart-column">            		
			<input id=${id} class="cart-input cart-reserve-days-input" type="number" value="0">
		</div>
		<div class="cart-remove cart-column"> 
			<button class="btn btn-danger" type="button">REMOVE</button>
        </div>`

    cartRowContents += reserveOnly;
    id++;
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    cartRow.getElementsByClassName('cart-reserve-days-input')[0].addEventListener('change', daysChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var daysElement = cartRow.getElementsByClassName('cart-reserve-days-input')[0]
        var price = parseFloat(priceElement.innerText.replace('лв', ''))
        var quantity = quantityElement.value
        var days = daysElement.value
        var reserveFee = (price <= 300) ? 3 : 5;
        total = total + (price * quantity) + (reserveFee * days)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = total + ' лв'
}

function reserveItems() {
    event.preventDefault();
    window.open('reserve_form.html');
}


