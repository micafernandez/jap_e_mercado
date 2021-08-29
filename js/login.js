//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function validateForm() {
  var nombre = document.getElementById("userName").value;
  var pass = document.getElementById("userPw").value;

  if (nombre != "" && pass != "") {
    window.location.href = "home.html";
    
  } else {
    alert("Debes ingresar usuario y contraseña");
    return false;
  }

  localStorage.setItem("userName", nombre);
  localStorage.setItem("userPw", pass);
}


