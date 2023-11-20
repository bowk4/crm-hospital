import {GetCard} from "../api/GetCard.js";

function filterCards() {
    const divMainCard = document.querySelectorAll(".main-card")
    const searchValue = document.getElementById("search").value.toLowerCase();
    const urgencyValue = document.getElementById("selectUrgency").value.toLowerCase();
    const status =  document.getElementById("status")
    fetch('https://ajax.test-danit.com/api/v2/cards', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem(`token`)}`
        },
    })
        .then(response => response.json())
        .then(data => {
            const filteredData = data.filter(element => {

                const doctorMatches = element.NameDoctor && element.NameDoctor.toLowerCase().includes(searchValue);

                return doctorMatches ;
            });
             divMainCard.forEach((card) => {
               card.style.display = `none`
                 card.remove()

             })


            filteredData.forEach((item) => {
                const getCards = new GetCard();
                if (item.NameDoctor === "Therapist" && (item.select.toLowerCase() == urgencyValue || urgencyValue === `all`) &&(item.stan == status.value || status.value === `All`)) {
                    getCards.createTherapist(item.NameDoctor, item.select, item.Name, item.description, item.Meta, item.Age, item.id, item.stan)
                } else if (item.NameDoctor === "Dentist" && (item.select.toLowerCase() == urgencyValue || urgencyValue === `all`) && (item.stan == status.value || status.value === `All`)) {
                    getCards.createDentist(item.NameDoctor, item.select, item.Name, item.description, item.Meta, item.LastVisit, item.id , item.stan)
                } else if (item.NameDoctor === "Cardiologist" && (item.select.toLowerCase() == urgencyValue || urgencyValue === `all`)  &&(item.stan == status.value || status.value === `All`)) {
                    getCards.createCardiologist(item.NameDoctor, item.select, item.Name, item.description, item.Meta, item.BMI, item.Vice, item.Illness, item.Age, item.id, item.stan)
                }

            })
 document.querySelectorAll(`.main-card`).forEach(el =>{
               if (!el.getAttribute(`data`)){
                   el.remove()
               }})
        })
}

document.addEventListener("DOMContentLoaded", function() {
    const btnSearch = document.getElementById("btnSearch")
    btnSearch.addEventListener("click", () => {
        filterCards();
    })
});



