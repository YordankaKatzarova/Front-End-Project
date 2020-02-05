function validateForm() {
	event.preventDefault();
    var inputPassword = document.forms["auth-form"]["password"].value;
    var inputEmail = document.forms["auth-form"]["email"].value;
	if (!validateEmail(inputEmail)) {
        alert("Please use a valid e-mail");
		return;
      }
    if (!validatePassword(inputPassword)) {
      alert("Password must contain at least 6 symbols, a letter and a number");
		return;
    }    
	window.location.href="new_index.html"
  }
  
  
function validateEmail (email) {
	const regex = /^[a-z0-9._-]+@[a-z0-9-]+\.[a-z-]{2,}$/;
	return regex.test(String(email).toLowerCase());
}

function validatePassword (pass) {
	const regex = /^[a-z0-9]{6,}$/;
	return regex.test(String(pass).toLowerCase());
}