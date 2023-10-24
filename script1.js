const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader'); 

let ready = false; 
let photosArray = [];
let totalImages = 0; 
let imagesLoaded = 0; 
let count = 30; 

const apiKey = "OOXYW7OAgUniZqBO4bDIAPiTUX-Rg7SRxqlBBUI4kzs";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

function removeATags(){
   const aElements = imageContainer.querySelectorAll('a');
  for(let i=0; i<6;i++){
      imageContainer.removeChild(aElements[i]); 
   }
}

function imageLoaded(){
   imagesLoaded++; 
   if(imagesLoaded === totalImages){
      ready = true; 
      loader.hidden = true; 
   }
}

function setAttributes(element, attributes){
   for(const key in attributes){
      element.setAttribute(key, attributes[key])
   }
}


function displayPhotos(){
   imagesLoaded=0; 
   totalImages = photosArray.length; 
   photosArray.forEach((photo)=>{
      const item = document.createElement('a'); 
      setAttributes(item, {
         href: photo.links.html, 
         target: '_blank'
      }); 
      const img = document.createElement('img'); 
      setAttributes(img, {
         src: photo.urls.regular, 
         title: photo.alt_description,
         description: photo.alt_description
      })
      item.appendChild(img);
      imageContainer.appendChild(item); 
      imageLoaded();
   })
}

async function getPhotos(){
   try{
      const response = await fetch(apiUrl);
      const json = await response.json();
      photosArray = json; 
      displayPhotos();
      console.log(photosArray)
   }
   catch(error){
      window.alert(error);
   }
}

window.addEventListener('scroll', ()=>{
   if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
      getPhotos();
      ready = false; 
      removeATags();
   }
})


getPhotos();
