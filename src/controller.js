function validateForm() {
    var inputPassword = document.forms["auth-form"]["password"].value;
    var inputUsername = document.forms["auth-form"]["username"].value;
    if (inputPassword == "") {
      alert("Password must be filled out");
      return false;
    }
    if (inputUsername == "") {
        alert("Username must be filled out");
        return false;
      }
  }