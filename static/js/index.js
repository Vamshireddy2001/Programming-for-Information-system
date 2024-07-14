const themeChangeButton=document.querySelector('.themechange');

color=false;
themeChangeButton.addEventListener('click',()=>{
    if(!color)
    {
        document.documentElement.style.setProperty('--primarycolor','#ff8989'); 
        color=true;
    }
    else
    {
        document.documentElement.style.setProperty('--primarycolor','red'); 
        color=false;
    }
 
});

let itemSection=[]
function cartFunction(id)
{
    const imagePart=document.querySelector(`#${id}`);
    itemSection.push(imagePart);
    fetch('/cart',{method:"POST",headers:{'Content-Type':'application/json'},body:itemSection})
    .then(e=>res.text())
    .then(e=>console.log("cart response:",e))
    .catch(e=>console.log("error cart",e))
}


const search=document.querySelector('#search');
// search.addEventListener('change',()=>window.location.href="/searchresults");

search.addEventListener('input',(e)=>{
   fetch(`/search/${e.target.value}`,{method:'GET'})
   .then(res=> { if (!res.ok) {
    throw new Error('Network response was not ok');
         }
    return res.json();})
   .then(products=>
    {
        const container = document.querySelector('.imagemain');
        console.log(products,container);
        container.innerHTML = ''; 
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
                <div class="imgsection" id="col">
                <h4>${product.name}</h4>
                <img src="${product.imgpath}" alt="${product.name}">
                <p>Price: ${product.price}</p>
                   <button onclick="cartFunction('${product.name}')">Add Cart</button>
                </div>
            `
            container.appendChild(productDiv);});
   
          
    }).catch(e=>console.log('err',e));

});
  



function saveCollection(route,dictCollection)
{
    fetch(route,{method:"POST",headers:{"Content-Type":"application/json"}})
}

document.addEventListener('DOMContentLoaded', function() {

    if(window.location.pathname =="/")
    {
        const search=document.querySelector('#search');
        search.style.display="none";
    }
})