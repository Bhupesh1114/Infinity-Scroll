const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash Api
const count = 30;
const apiKey = "0w9XSKkAa_kQPzPEwZVvMQYV9qbZrmR1JDSIhxhjh1I";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded

function imageLoaded() {
    imagesLoaded++;
    // console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}


//  Helper Function to set Attributes on Dom Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for links & photos , add to Dom
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //  Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create Image for photo
        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Event Listner, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put the <img> inside <a> , then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API

async function getPhotos() {
try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
} catch (error) {
    // Catcgh Error here
}
}

//  Check to see if scrolling near bottom of page, Load More Photos

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// On load
getPhotos();