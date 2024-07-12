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
    
}