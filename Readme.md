loading.io --> loading animations

svg - scalable vector graphics

we have svg animated from this website 

unsplash.com --> for images


Use below meta viewport tag, if your media queries are not working as expected, add inside <head> tag

<meta name="viewport" content="width=device-width, initial-scale=1"> 


background: whitesmoke ----> For eye comfort 
letter-spacing: 5px;   ----> letter spacing


trick to center loader: 

.loader{
   position: fixed;
   top: 0;
   bottom:0;
   left: 0; 
   right: 0;
   background: rgba(255,255,255,0.8);
} 

.loader img{
   position: fixed;
   top: 50%; 
   left:50%; 
   transform: translate(-50%, -50%);
}


//Scrolling logic: 

All values in pixels 

window.scrollY ----> Distance from top of page to user has scrolled 
window.InnerHeight ---> Total height of browser window 

document.body.offsetHeight ---> Height of eerything in the body, including what is not within view 

---> Load more when user scrolls to this point (less than or equal to 1000px of complete body height)

Formual derived: 
(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)

&& when all existing fetched images loads in the page 
