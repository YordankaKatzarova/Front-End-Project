
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

request('https://c0a69d0c-f9ef-4ef7-be6a-f39493b8af03.mock.pstmn.io/photoCameras', 'GET', loadProducts);

function loadProducts(data) {
  let temp = data.photo_cameras.camera[0];
  console.log(temp);

  let temp2 = `<h1 class="cameraName">${temp.camera_name}<h1>`;


  var cameras = '<div class="cameras">';
  let container = document.getElementById('container');
  data.photo_cameras.camera.forEach(camera => {
    cameras += ('<div class="camera ">' + '<h1 class="cameraName">' + camera.camera_name + '<h1>' + '<h2 class="cameraPrice">' + camera.camera_price + '<h2>' + '</div>');
    cameras += '</div>';
  });
container.innerHTML= cameras;
  
  console.log(cameras);
}

loadProducts();



