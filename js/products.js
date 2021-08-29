const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COSTO = "Precio";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minPrecio = undefined;
var maxPrecio = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_PRECIO){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productPrecio);
            let bCount = parseInt(b.productPrecio);

            if ( aPrecio > bPrecio ){ return -1; }
            if ( aPrecio < bPrecio ){ return 1; }
            return 0;
        });
    }

    return result;
}



  function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList();
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes
document.addEventListener("DOMContentLoaded", function (e) {
    var currentProductsArray = [];
    
    // paso el json de productos a un JS objet
    fetch('https://japdevdep.github.io/ecommerce-api/product/all.json')
      .then(response => response.json())
      .then(data => {
    
         function showProductsList() { 
    
             let htmlContentToAppend = "";
    
             for( let i=0; i< data.length; i++) {
                let product = data[i];
               htmlContentToAppend +=         `
                 <a href="product-info.html" class="list-group-item list-group-item-action">
                   <div class="row">
                    <div class="col-3">
                            <img src="` + data[i].imgSrc + `" alt="` + data[i].description + `" class="img-thumbnail">
                            </div>
                            <div class="col">
                             <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ data[i].name +`</h4> <h3> ` + product.currency + `  ` + product.cost + ` </h3>
                                 <small class="text-muted">` + data[i].soldCount +` artículos </small>
                            </div>                         <p class="mb-1">` + data[i].description + `</p>
                        </div>
                    </div>
               </a>
               ` 
               document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
                    }
    
             }
            showProductsList(); 
            
      });
    
    });

   