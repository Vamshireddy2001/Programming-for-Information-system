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
}


const search=document.querySelector('#search');

search.addEventListener('input',(e)=>{
   fetch(`/search/${e.target.value}`,{method:'GET'})
   .then(res=> { if (!res.ok) {
    throw new Error('Network response was not ok');
         }
    return res.json();})
   .then(res=>
    {
        const container = document.getElementById('productContainer');
        container.innerHTML = ''; 
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
                <h2>${product.name}</h2>
                <img src="${product.imgpath}" alt="${product.name}">
                <p>Price: ${product.price}</p>
            `;
            container.appendChild(productDiv);
    })}
   )
   .catch(e=>console.log('err',e));
});



function saveCollection(route,dictCollection)
{
    fetch(route,{method:"POST",headers:{"Content-Type":"application/json"}})
}