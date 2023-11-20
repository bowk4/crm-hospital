
export function unAuthorization(select) {
         document.getElementById(`logOut`).addEventListener('click', () => {
         document.getElementById('addVisit').style.display = "none";
         document.getElementById(`logOut`).style.display = "none";
         document.querySelector(`.filter-section`).style.display = "none";
         document.querySelector(`main`).innerHTML = ` `;
         localStorage.clear()
    })}
