var product = {};

function showImagesGallery(array){

    let carousel = document.querySelector('.carousel-indicators');
    let carouselImg = document.querySelector('.carousel-inner');
    
    array.forEach((e,index) => {
        carousel.innerHTML += `
                                <li data-target="#carouselExampleIndicators" 
                                data-slide-to="${index}"></li>
                                `;
        //class="active"
        carouselImg.innerHTML += `
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="${e}">
                                </div>
                                `;  
    });
    carousel.firstElementChild.classList.add('active');
    carouselImg.firstElementChild.classList.add('active');
 
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData("https://japdevdep.github.io/ecommerce-api/product/5678.json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productsoldCountHTML = document.getElementById("productsoldCount");
            let productCostHTML = document.getElementById("productCost");
            let productCurrencyHTML = document.getElementById("productCurrency");
            
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productsoldCountHTML.innerHTML = product.soldCount;
            productCostHTML.innerHTML = product.cost;
            productCurrencyHTML.innerHTML = product.currency;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
});







function ponerestrellas(comen) {
    let estrellavacia = '<span class="fa fa-star"></span>'
    let estrellapintada = '<span class="fa fa-star checked"></span>'
    return estrellapintada.repeat(comen)+estrellavacia.repeat(5-comen)
}


// paso el json de productos a un JS objet
fetch('https://japdevdep.github.io/ecommerce-api/product/5678-comments.json')
  .then(response => response.json())
  .then(comen => {

     function comentarios() { 

         let htmlContentToAppend = "";

                        
            for ( let i=0; i< comen.length; i++) {
               
                htmlContentToAppend +=        
                 `               
                    <div class="media-body">

                            <h5 class="mt-0">@${comen[i].user+ponerestrellas(comen[i].score)}</h5>
                            </div>
                            <div class="col-md-auto">  ` + comen[i].description + `
                            
                             <div class="d-flex w-100 justify-content-between">                               
                                 <small class="text-muted">` + comen[i].dateTime + ` </small>
                            </div>     
                        </div>
                    </div>
               </a>
               ` 
               
                

           document.getElementById("comentaritos").innerHTML = htmlContentToAppend;
                

        }} 
        comentarios(); 

        
  });

 
// muestro productos relacionados

let infoproducto = {};

function mostrarRelacionados(array) {

    let html ="";
    for(let i=0; i< array.length;i++) {
        let relacionado = array[i];
        html += `
        <div class="col-md-4">
        <a href="" class="card mb-4 shadow-sm custom-card">
          <img class="bd-placeholder-img card-img-top"  src="${product[relacionado].imgSrc}">
          <h3 class="m-3">${product[relacionado].name}</h3>
          <div class="card-body">
            <p class="card-text">${product[relacionado].description}</p>
          </div>
        </a>
      </div>`;
    }
        document.getElementById("relacionados").innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData("https://japdevdep.github.io/ecommerce-api/product/5678.json")
    .then(respuesta1=>{
        if(respuesta1.status=="ok"){
             infoProducto = respuesta1.data;
             getJSONData("https://japdevdep.github.io/ecommerce-api/product/all.json")
                .then(respuesta2=>{
                if(respuesta2.status=="ok"){
                    product = respuesta2.data;
                    mostrarRelacionados(infoProducto.relatedProducts);

                }
                })
    }
})
})

