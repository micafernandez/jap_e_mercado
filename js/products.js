const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COST = "Cost";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

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
    }else if (criteria === ORDER_BY_PROD_COST){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.productCost);
            let bCost = parseInt(b.productCost);

            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;
        });
    }

    return result;
}

// // paso el json de productos a un JS objet
// fetch('https://japdevdep.github.io/ecommerce-api/product/all.json')
//   .then(response => response.json())
//   .then(data => {

     function showProductsList() { 

         let htmlContentToAppend = "";

         for( let i=0; i< currentProductsArray.length; i++) {
            let product = currentProductsArray[i];

            if (((minCost == undefined) || (minCost != undefined && parseInt(product.productCost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.productCost) <= maxCost))){  

           htmlContentToAppend +=         `
             <a href="product-info.html" class="list-group-item list-group-item-action">
               <div class="row">
                <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                        </div>

                       
                       
                        <div class="col">
                         <div class="d-flex w-100 justify-content-between"> 
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <div class="col">
                   
                            <h3> ` + product.currency + `  ` + product.cost + ` </h3>
                             </div>
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

    //Muestro los productos ordenados
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCost").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COST);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
        
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductsList();
    });
    
});

