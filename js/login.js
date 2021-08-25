//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
  

function validateForm() {
    var x = document.forms["myForm"]["fname"].value;
    var y = document.forms["myForm"]["password"].value;
    
    if (x == "" || y == ""  ) {
      alert("Debes ingresar usuario y contraseña");
      return false;
    }

   
}





