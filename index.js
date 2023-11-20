
const home = document.querySelector("main").childNodes;
const items = document.querySelector(".not-items");

setInterval(() => {
    if (home.length > 3) {
        items.style.display = 'none'
    }
    else {
        items.style.display = 'block'
    }

} ,1)
