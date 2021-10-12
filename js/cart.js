
let productosCarrito = [];

function updateProductoSubtotal(cantidad, unitCost, id, currency){

  let subtotalProd = cantidad*unitCost;

  document.getElementById("subtotal"+id).innerHTML= currency + " " + subtotalProd;

  updateTotal();

}

function showCarrito() {
  let htmlToAppend = "";
  let i = 0;
  for (let article of productosCarrito){
    htmlToAppend += `
    <tr> <img src="${article.src}" class = "img-fluid" style="max-width:70px!important"></td>
    <td class="align-middle">${article.name}</td>
    <td class="align-middle">${article.currency} ${article.unitCost}</td>
    <td class="align-middle"><input type="number" min ="1" value=${article.count} id="${i}" onchange= "updateProductoSubtotal(this.value,${article.unitCost},${i},'${article.currency}')"></td>
    
    <td class="align-middle subtotal" id="subtotal${i}">${article.currency} ${article.count *article.unitCost}</td>
    </tr><br>

   
    </tr>
    `
    i++;
  }

  document.getElementById("carrito").innerHTML = htmlToAppend;
}

function updateTotal() {

  let total=0;
  let subtotales = document.getElementsByClassName("subtotal");
  for (let sub of subtotales){

    total += convertir(sub.innerHTML.split(" ")[0], parseFloat(sub.innerHTML.split(" ")[1]));
  }


  function convertir(moneda, valor){

    let conversion= valor;
    if (moneda === "UYU"){
      conversion = valor/40;
    }
    return conversion;

  }

  function arbitraje(moneda,actual,valor){
    let arbitraje = valor;
    if (moneda !==actual){
      if(moneda ==="USD"){
        conversion = valor/40
      }else{
        conversion = valor*40;
      }
    }
    return conversion;
  }
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

console.log(productosCarrito);
  })

})