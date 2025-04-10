// 
// Read and add to HTML all images via *.json file list
// 
// Remember to set imgix path correctly to serve images online properly.
// It may need a specific sub-folder name from the `Assets` repo.
var imgix_path = "https://sound-spinning-pics.imgix.net/";
// imgix settings, appended after image filename.
// Input width value `w=` right.
var imgix_ops = "?w=800&auto=compress,enhance,format";

// START parsing file list
fetch('js/images.json')
.then(response => response.json())
.then(data => {
  const main_grid = document.getElementById("grid");
  const dataImgs = data.images;
  // Append images to HTML
  for (const img of dataImgs) {
    main_grid.innerHTML +=
`     <!-- IMG${img.imgId} -->
			<article>
				<img src="${imgix_path}${img.file}${imgix_ops}" alt="${img.alt}" loading="lazy"/>
				<h2>${img.imgId}.- ${img.title}</h2>
				<p>${img.info}</p>
			</article>`;
  }
  // console.log("Got Here#1"); 
  // this is called here so that the DOM has all elements required
  window.onload = init();
})
.catch(error => console.error("Error fetching JSON data:", error));
// END dealing with files in JSON list


function init() {
  // Get the modals
  var modal = document.getElementById("main-modal");
  var footModal = document.getElementById("foot-modal");
  
  // Get the image and insert it inside the modal - use its "alt" text as a caption
  var imgs = document.querySelectorAll("article img");
  var modalImg = document.getElementById("modal-img");
  var captionText = document.getElementById("modal-caption");
  imgs.forEach(e => {
    e.onclick=()=> {
      modal.style.display = "block";
      modalImg.src = e.src;
      captionText.innerHTML = e.alt;
    }
  })
  
  // About box popup
  var aboutBox = document.querySelector(".foot-bar > a");
  aboutBox.onclick=()=> {
    footModal.style.display = "flex";
  }
  
  // Get the <span> elements that close the modals
  var xClose = document.querySelectorAll("span.close");
  
  // When the user clicks on <span> (x), close the modal
  xClose.forEach(e => {
    e.onclick = function() { 
      // modal.style.display = "none";
      modal.style.animation = "slideOut 1s";
      footModal.style.animation = "slideOut 1s";
      setTimeout(()=>{
        modal.style.display = "none";
        modal.style.animation = "slideIn 1s";
        footModal.style.display = "none";
        footModal.style.animation = "slideIn 1s";
      },500)
    }
  })
  // console.log("Got Here#2"); 
};
