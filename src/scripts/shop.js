
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

// ------------------------------

function loadProducts(data) {
  console.log(data);
  //let temp2 = `<h1 class="cameraName">${temp.camera_name}<h1>`;
  var camerasContainer = document.getElementById('camerasContainer');
  let camerasData = '';
  let cameraRow = '<div class="cameraRow">';
  let rowData = cameraRow;
  let rowElements = 0;

  for (let i = 0; i < data.cameras.length; i++) {
    rowData += (
      '<div class="cameraColumn">' + 
        '<img src="images/'+ data.cameras[i].camera_image + '"' + 'alt="product" class="product-img">' +
        '<button class="btn btn-primary shop-item-button"> Add to cart </button>' +
        '<h2 class="cameraName">' + data.cameras[i].camera_name + '</h2>' +
        '<h3 class="cameraPrice">' + data.cameras[i].camera_price + '</h3>' +
     '</div>');
    rowElements ++;
	
	
    if (rowElements == 3) {
		camerasData += rowData + '</div>';
		rowData = cameraRow;
		rowElements = 0;
    } 
  };
  camerasContainer.innerHTML = camerasData;

}

// --------------------------------

function loadCameras(data) {
  console.log(data);
  var camerasContainer = document.getElementById('camerasContainer');
  let camerasData = '';

  for (let i = 0; i < data.cameras.length; i++) {
    camerasData += (
      '<article class="singleCamera">' + 
        '<div class="img-container"><img src="images/'+ data.cameras[i].camera_image + '"' + 'alt="product" class="product-img">'
		 +'<div class="overlay"> <div class="description"> description </div></div></div>' +
        '<button class="btn btn-primary shop-item-button"><i class="fa fa-shopping-cart"></i> Add to cart </button>' +
        '<h2 class="cameraName">' + data.cameras[i].camera_name + '</h2>' +
        '<h3 class="cameraPrice">' + data.cameras[i].camera_price + " лв" +'</h3>' +
     '</article>');
	    
  };
  camerasContainer.innerHTML = camerasData;

}

// cart functions

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
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

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
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

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${camera_image}" width="100" height="100">
            <span class="cart-item-title">${camera_name}</span>
        </div>
        <span class="cart-price cart-column">${camera_price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}




