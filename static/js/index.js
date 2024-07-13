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
   .then(res=>console.log(res))
   .catch(e=>console.log('err',e));
});

dictProductCollection=[
    {"name":"A Field Of Memories","price":"$100","imgpath":"static/images/coll1.jpg"},
    {"name":"Baby Bloom","price":"$130","imgpath":"static/images/coll12.jpg"},
    {"name":"Be Merry","price":"$80","imgpath":"static/images/coll13.jpg"},
    {"name":"Beach Travel","price":"$90","imgpath":"static/images/coll14.jpg"},
    {"name":"Birds and Bobbins","price":"$110","imgpath":"static/images/coll15.jpg"},
    {"name":"Blue Skies and Nutmeg","price":"$130","imgpath":"static/images/coll17.jpg"},
    {"name":"British Waterways","price":"$80","imgpath":"static/images/coll18.jpg"},
    {"name":"Butterfly Dreams","price":"$90","imgpath":"static/images/coll10.jpg"},
    {"name":"Cutest Little Elephant Blue","price":"$120","imgpath":"static/images/coll11.jpg"},
    {"name":">Cutest Little Elephant Pink","price":"$110","imgpath":"static/images/coll12.jpg"},
]