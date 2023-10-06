const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0; 
let totalImages = 0; 
let photosArray = []; 

const count = 15; 
// Normally, don't store API Keys like this, but an exception made here because it is free, and the data is publicly available!
const apiKey = 'Nup6qju965HYD9BJ3HobhOF5AKSj4tFX12rOG7UDweY'; 
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`; 


//Free up DOM Tree by removing some <img>, as it can overload the DOM tree and can freeze the page 
function removeImgTags(element){
   // Find all <a> elements within the <div>
   console.log("About to free up dom tree by removing <img> elements from this image container from top");
   var aElements = element.querySelectorAll("a");
   for(let i=0;i<6;i++){
      element.removeChild(aElements[i]); 
   }
}


function imageLoaded(){
   imagesLoaded++; 
   if(imagesLoaded === totalImages){
      ready = true; 
      loader.hidden = true; 
   }
}



//Helpher Function to Set Attritutes on DOM Elements 
function setAttributes(element, attributes){
   for(const key in attributes){
      element.setAttribute(key, attributes[key])
   }
}

//Create Elements For Links & Photos, Add to DOM 
function displayPhotos(){
   imagesLoaded = 0; 
   totalImages = photosArray.length; 
   //Run function for each object in photosArray 
   photosArray.forEach((photo)=>{
      //Create <a> to link to Unsplash 
      const item = document.createElement('a'); 
      setAttributes(item, {
         href: photo.links.html,
         target: '_blank',
      })
      //Create <img> for photo 
      const img = document.createElement('img'); 
      setAttributes(img, {
         src: photo.urls.regular,
         alt:  photo.alt_description,
         title: photo.alt_description,
      })
      //Put <img> inside <a>, then put both inside imageContainer Element 
      item.appendChild(img); 
      imageContainer.appendChild(item);  
      imageLoaded();
   })
}

async function getPhotos(){
   try{
      const response = await fetch(apiUrl); 
      photosArray = await response.json(); 
      displayPhotos();
   }
   catch(error){
      console.log(error)
   }
}

//Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', ()=>{
   if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
      ready = false; 
      console.log("we are about to fetch photos");
      getPhotos();
      removeImgTags(imageContainer);
   }
})


//On Load
getPhotos()


/***
 * window.innerHeight --> displayed screen height 
 * window.scrollY --> user scrolled height from top (y axis)
 * document.body.offsetHeight --> complete body height (includes what user is not seeing also)
 */