const ORDER_ASC_BY_COST = "AZ";
const ORDER_DESC_BY_COST = "ZA";
const ORDER_BY_PROD_REL = "REL";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minPrecio = undefined;
var maxPrecio = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_REL){
        result = array.sort(function(a, b) {
            let asoldCount = parseInt(a.soldCount);
            let bsoldCount = parseInt(b.soldCount);

            if ( asoldCount > bsoldCount ){ return -1; }
            if ( asoldCount < bsoldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}
 
         function showProductsList() { 
    
             let htmlContentToAppend = "";
    
             for( let i=0; i< currentProductsArray.length; i++) {
                var product = currentProductsArray[i];
    

        if (((minPrecio == undefined) || (minPrecio != undefined && parseInt(product.cost) >= minPrecio)) &&
            ((maxPrecio == undefined) || (maxPrecio != undefined && parseInt(product.cost) <= maxPrecio))){

               htmlContentToAppend +=         `
                 <a href="product-info.html" class="list-group-item list-group-item-action">
                   <div class="row">
                    <div class="col-3">
                            <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                            </div>
                            <div class="col">
                             <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ product.name +`</h4> <h3> ` + product.currency + `  ` + product.cost + ` </h3>
                                 <small class="text-muted">` + product.soldCount +` artículos </small>
                            </div>                         <p class="mb-1">` + product.description + `</p>
                        </div>
                    </div>
               </a>
               ` 
            }
               document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
                    }
    
             }

  

    function sortAndShowProducts(sortCriteria, productsArray){
        currentSortCriteria = sortCriteria;
    
        if(productsArray != undefined){
            currentProductsArray = productsArray;
        }
    
        currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    
        //Muestro los productos ordenadas
        showProductsList();
    }

   
    document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(PRODUCTS_URL).then(function(resultObj){
            if (resultObj.status === "ok"){
                sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
            }
        });
    
    document.getElementById("sortAsc").addEventListener("click", function(){
            sortAndShowProducts(ORDER_ASC_BY_COST);
        });

        document.getElementById("sortDesc").addEventListener("click", function(){
            sortAndShowProducts(ORDER_DESC_BY_COST);
        });

        document.getElementById("sortBysoldCount").addEventListener("click", function(){
            sortAndShowProducts(ORDER_BY_PROD_REL);
        });

        document.getElementById("clearRangeFilter").addEventListener("click", function(){
            document.getElementById("rangeFilterminPrecio").value = "";
            document.getElementById("rangeFiltermaxPrecio").value = "";
    
            minPrecio = undefined;
            maxPrecio = undefined;
    
            showProductsList();
        });

        document.getElementById("rangeFilterPrecio").addEventListener("click", function(){
            //Obtengo el mínimo y máximo de los intervalos para filtrar por precio´
            
            minPrecio = document.getElementById("rangeFilterminPrecio").value;
            maxPrecio = document.getElementById("rangeFiltermaxPrecio").value;
    
            if ((minPrecio != undefined) && (minPrecio != "") && (parseInt(minPrecio)) >= 0){
                minPrecio= parseInt(minPrecio);
            }
            else{
                minPrecio = undefined;
            }
    
            if ((maxPrecio != undefined) && (maxPrecio != "") && (parseInt(maxPrecio)) >= 0){
                maxPrecio= parseInt(maxPrecio);
            }
                else{
                maxPrecio = undefined;
            }
    
            showProductsList();
        });
    });






    const formulario = document.querySelector("#formulario")
    const boton = document.querySelector("#boton")
    const resultado = document.querySelector("#resultado")

const filtrar = ()=> {
    // console.log(formulario.value);

    resultado.innerHTML = " ";
    const texto = formulario.value.toLowerCase()
    for( let product of currentProductsArray) {
        let name = product.name.toLowerCase();
        if(name.indexOf(texto) !== -1) {

            resultado.innerHTML += `<li>${product.name}</li>`

        }
    }
    if(resultado.innerHTML ===""){
        resultado.innerHTML += `<li>Resultado no encontrado</li>`
    }
}

    boton.addEventListener("click", filtrar)
    formulario.addEventListener("keyup", filtrar)

    filtrar();