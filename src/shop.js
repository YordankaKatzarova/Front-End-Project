
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

request('https://c0a69d0c-f9ef-4ef7-be6a-f39493b8af03.mock.pstmn.io/cameras2', 'GET', loadProducts);

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
        '<button class="bag-btn">' +
        '<h1 class="cameraName">' + data.cameras[i].camera_name + '<h1>' +
        '<h2 class="cameraPrice">' + data.cameras[i].camera_price + '<h2>' +
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




