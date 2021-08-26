//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
  



function validateForm() {
  var x = document.forms["loginform"]["userName"].value;
  var y = document.forms["loginform"]["password"].value; 
    
    if (x == "" || y == ""  ) {
      alert("Debes ingresar usuario y contraseña");
      return false;
    }
    else { window.location.href= "home.html"}

   }




// // alamacena datos de formulario de registro
// function store() {
//   localStorage.setItem('x', x);
//   localStorage.setItem('y', y);
// }
// console.log(localStorage) 
// store()


