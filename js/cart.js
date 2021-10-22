cotizacionelegida = 40
let productoselegidos = [];

function showCarrito() {
  let htmlToAppend = "";
  let i = 0;
  for (let article of productosCarrito){
    htmlToAppend += `
    <tr><td> <img src="${article.src}"  class="rounded mx-auto d-block" style="max-width:120px!important"></td>
    <td class="align-middle">${article.name}</td>
    <td class="align-middle">${article.currency} ${article.unitCost}</td>


    <td class="align-middle"><input type="number" class="form-control quantity-input" min ="1" value=${article.count} id="${i}" onchange= "actualizaSubtotalA(this.value,${article.unitCost},${i},'${article.currency}')"></td>
    
    
    <td class="align-middle subtotal" id="subtotal${i}">${article.currency} ${article.count *article.unitCost}</td>
    </tr><br>

   
    </tr>
    `
    i++;
  }

  document.getElementById("carrito").innerHTML = htmlToAppend;
}

function actualizaSubtotalA(cantidad, unitCost, id, currency){

  let SubtotalA = unitCost*cantidad;

  document.getElementById("subtotal"+id).innerHTML= currency + " " + SubtotalA;

  actualizaTotal();

}
function actualizaTotal() {

  let total=0;
  let subtotales = document.getElementsByClassName("subtotal");
  for (let sub of subtotales){

    total += convertir(sub.innerHTML.split(" ")[0], parseFloat(sub.innerHTML.split(" ")[1]));

  }
  document.getElementById("total").innerHTML = "USD"+ " " +total;
}

  function convertir(moneda, valor){

    let conversion= valor;
    if (moneda === "UYU"){
      conversion = valor/cotizacionelegida;
    }
    return conversion;

  }

  function arbitraje(moneda,actual,valor){
    let arbitraje = valor;
    if (moneda !==actual){
      if(moneda ==="USD"){
        conversion = valor/cotizacionelegida
      }else{
        conversion = valor*cotizacionelegida;
      }
    }
    return conversion;
  }
 

// paso el json de productos a un JS objet
function getCarrito(url){
return fetch(url)
.then(respuesta=>{
  return respuesta.json();
})

}

document.addEventListener("DOMContentLoaded", function(e) {

  getCarrito("https://japdevdep.github.io/ecommerce-api/cart/654.json")
.then(respuesta=>{
productosCarrito = respuesta.articles;
showCarrito();

actualizaTotal() })

})

