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
    
    const button=imagePart.querySelector('button')

    const image=imagePart.querySelector('img').src;
    
    const h4=imagePart.querySelectorAll('h4');

    
    let object={button,image,"text":h4[0].innerText,"price":h4[1].innerText};

    itemSection.push(object);
     
    alert("Item added to cart!")
    sessionStorage.setItem("cart",JSON.stringify(itemSection));


    // fetch('/cart',{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify(itemSection)})
    // .then(e=>e.text())
    // .then(e=>console.log("cart response:",e))
    // .catch(e=>console.log("error cart",e))
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
    if(window.location.pathname=="/cart")
    {
        let cartItems=sessionStorage.getItem("cart");
        const cartempty=document.querySelector('.cartempty');

        if(cartItems)
        {
            cartempty.style.display="none";
        }

        const container = document.querySelector('.cartsection');
        container.innerHTML = ''; // Clear the container first
        if (cartItems) {
            cartItems = JSON.parse(cartItems);
            cartItems.forEach(itemHTML => {
                const div = document.createElement('div');
                div.classList.add('imgsection');
                
                const image=document.createElement('img');
                image.src=itemHTML.image;
                div.append(image);
                const title=document.createElement('h4');
                title.innerText=itemHTML.text;
                div.append(title);
                const price=document.createElement('h4');
                price.innerText=itemHTML.price;
                div.append(price);
           
                const button=document.createElement('button');
                button.innerText="Remove From Cart";
                div.append(button);
                container.appendChild(div);
            });
        }
    }
})