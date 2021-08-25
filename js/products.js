// var currentProductsArray = [];

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
                            <h4 class="mb-1">`+ data[i].name +`</h4>
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

