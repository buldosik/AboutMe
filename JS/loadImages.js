const section = document.getElementById("section1");
const imageUrls = [
    "./images/project2/mainMenu.png",
    "./images/project2/shop.png",
    "./images/project2/gameplay.png"
];

const promises = imageUrls.map(url => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve(img);
        };
        img.onerror = () => {
            reject(new Error(`Failed to load image ${url}`));
        };
        img.src = url;
    });
});

Promise.all(promises)
    .then(images => {
        // Replace the existing <img> elements with the loaded images
        const imgElements = section.querySelectorAll("img");
        images.forEach((image, index) => {
            imgElements[index].parentNode.replaceChild(image, imgElements[index]);
        });
    })
    .catch(error => {
        console.error("Error loading images:", error);
    });
