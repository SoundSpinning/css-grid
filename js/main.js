// 
// Read and add to HTML all images via *.json file list
// 
// Remember to set imgix path correctly to serve images online properly.
// It may need a specific sub-folder name from the `Assets` repo.
var imgix_path = "https://sound-spinning-pics.imgix.net/";
// imgix settings, appended after image filename.
// Input width value `w=` right.
var imgix_ops = "?w=800&auto=compress,enhance,format";
// var index = 0;

// START parsing file list
fetch('js/images.json')
.then(response => response.json())
.then(data => {
  const main_grid = document.getElementById("grid");
  const dataImgs = data.images;
  // Append images to HTML
  for (const img of dataImgs) {
    // index += 1;
    main_grid.innerHTML +=
`     <!-- IMG${img.imgId} -->
			<article>
				<img src="${imgix_path}${img.file}${imgix_ops}" alt="${img.alt}" loading="lazy" data-id="${img.imgId}"/>
				<h2>${img.imgId}.-${img.year}<span> ${img.alt}</span></h2>
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
  var aboutModal = document.getElementById("about-modal");
  var controlsModal = document.getElementById("controls-modal");
  
  // Get the image and insert it inside the modal - use its "alt" text as a caption
  // + carousel inside the modal
  var imgs = document.querySelectorAll("article img");
  // var imgH2 = document.querySelectorAll("article h2");
  // var imgp = document.querySelectorAll("article p");
  var modalImg = document.getElementById("modal-img");
  var modalPrev = document.getElementById("prev");
  var modalNext = document.getElementById("next");
  var modalCount = document.getElementById("count");
  var captionText = document.getElementById("modal-caption");
  imgs.forEach(e => {
    e.onclick=()=> {
      modal.style.display = "block";
      modalImg.src = e.src;
      captionText.innerHTML = e.alt;
      modalCount.innerHTML = e.dataset.id+" / "+imgs.length;
      // basic carousel logic via controls
      modalPrev.onclick=()=> {
        if (e.dataset.id == 1) {
          e = imgs[imgs.length - 1];          
        } else {
          e = imgs[e.dataset.id - 2];
        }
        modalImg.src = e.src;
        captionText.innerHTML = e.alt;
        modalCount.innerHTML = e.dataset.id+" / "+imgs.length;
        // console.log("clicked Prev: img-id = ", e.dataset.id); 
      }
      modalNext.onclick=()=> {
        if (e.dataset.id == imgs.length) {
          e = imgs[0];          
        } else {
          e = imgs[e.dataset.id];
        }
        modalImg.src = e.src;
        captionText.innerHTML = e.alt;
        modalCount.innerHTML = e.dataset.id+" / "+imgs.length;
        // console.log("clicked Next: img-id = ", e.dataset.id); 
      }

    }
  })
  
  // About box popup
  var footBar = document.querySelector(".foot-bar");
  var aboutBox = document.querySelector(".foot-bar > span:nth-of-type(1) > a");
  var controlsBox = document.querySelector(".foot-bar > span:nth-of-type(2) > a");
  aboutBox.onclick=()=> {
    aboutModal.style.display = "flex";
    footBar.style.display = "none";
  }
  controlsBox.onclick=()=> {
    controlsModal.style.display = "flex";
    footBar.style.display = "none";
  }
  
  // Get the <span> elements that close the modals
  var xClose = document.querySelectorAll("span.close");
  
  // When the user clicks on <span> (x), close the modal
  xClose.forEach(e => {
    e.onclick = function() { 
      // modal.style.display = "none";
      modal.style.animation = "slideOut 1s";
      aboutModal.style.animation = "slideOut 1s";
      controlsModal.style.animation = "slideOut 1s";
      setTimeout(()=>{
        modal.style.display = "none";
        modal.style.animation = "slideIn 1s";
        aboutModal.style.display = "none";
        aboutModal.style.animation = "slideIn 1s";
        controlsModal.style.display = "none";
        controlsModal.style.animation = "slideIn 1s";
        footBar.style.display = "flex";
      },500)
    }
  })

  // get range (slider) value:
  // Get the root element
  var r = document.querySelector(':root');
  // slider input element
  var gapSize = document.getElementById("gapSwitch");
  gapSize.addEventListener('input', () => {
    r.style.setProperty('--gap', gapSize.value+'rem');
    // console.log("Got Here#2 :", gapSize.value);
  })

  // console.log("Got Here#2"); 
};
