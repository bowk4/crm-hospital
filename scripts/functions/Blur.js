export function blur() {
    const blur_wrapper = document.querySelector(".blur-wrapper")
    blur_wrapper.style = `position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: block;
    z-index: 12;`

}

export function unBlur() {
    const blur_wrapper = document.querySelector(".blur-wrapper")
    blur_wrapper.style.display = "none";

}

export function blurClose(event, closeModalCard) {
    if (event.target.classList.contains('blur-wrapper')) {
        closeModalCard();
        unBlur();
    }
}