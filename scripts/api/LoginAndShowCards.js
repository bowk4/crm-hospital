import {GetCard} from "./GetCard.js";
import {unBlur} from "../functions/Blur.js";
import {unAuthorization} from "../functions/LogOut.js";
import {proofAutorization} from "../functions/ProofAutorization.js";
import {Modal} from "../classes/Modal.js";


if (localStorage.getItem(`autoriz`)) {

    fetch("https://ajax.test-danit.com/api/v2/cards", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(`token`)}`
        }
    }).then(res =>
        res.json()
    )
        .then(data => {
            data.forEach((el) => {

                if (el.NameDoctor === `Dentist`) {
                    let getCard = new GetCard()
                    getCard.createDentist(el.NameDoctor, el.select, el.Name, el.description, el.Meta, el.LastVisit, el.id, el.stan)
                }
                if (el.NameDoctor === `Therapist`) {
                    let getCard = new GetCard()
                    getCard.createTherapist(el.NameDoctor, el.select, el.Name, el.description, el.Meta, el.Age, el.id, el.stan)
                }
                if (el.NameDoctor === `Cardiologist`) {
                    let getCard = new GetCard()
                    getCard.createCardiologist(el.NameDoctor, el.select, el.Name, el.description, el.Meta, el.BMI, el.Vice, el.Illness, el.Age, el.id, el.stan)
                }
            })
            unBlur();
            document.getElementById('addVisit').style.display = "inline";
            document.getElementById(`logOut`).style.display = "inline";
            document.querySelector(`.filter-section`).style.display = "block";
            unAuthorization();
            proofAutorization()
        })
        .catch(err => {
            console.log(err)
        })

} else if (!localStorage.getItem(`autoriz`)) {
    new Modal().authorization()
}







