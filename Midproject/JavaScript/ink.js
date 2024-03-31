function openPage(pageName, elmnt, color) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }

    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";

    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();



const content = document.getElementById('Pagcontent');
const pagination = document.getElementById('pagination');
const itemsPerPage = 2;
const pageCount = Math.ceil(Pagcontent.children.length / itemsPerPage);

function initPagination() {
    for (let i = 1; i <= pageCount; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = i;
        a.addEventListener('click', () => showPage(i));
        li.appendChild(a);
        pagination.appendChild(li);
    }

    showPage(1);
}

function showPage(pageNumber) {
    const start = (pageNumber - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    for (let i = 0; i < Pagcontent.children.length; i++) {
        Pagcontent.children[i].style.display = (i >= start && i < end) ? 'block' : 'none';
    }

    updatePaginationStyle(pageNumber);
}

function updatePaginationStyle(activePage) {
    const paginationItems = pagination.getElementsByTagName('a');
    for (let i = 0; i < paginationItems.length; i++) {
        paginationItems[i].classList.remove('active');
    }
    paginationItems[activePage - 1].classList.add('active');
}

initPagination();



// 漫畫頁籤
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// 小說分頁
function openCity(cityName, elmnt, color) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("moutabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("moutablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  // Show the specific tab content
  document.getElementById(cityName).style.display = "block";

  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen1").click();



