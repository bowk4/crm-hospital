import {EditModalCard} from "../classes/EditModalCard.js";
import {blur, blurClose, unBlur} from "../functions/Blur.js";

export function editCard(select) {

    const btnEdit = document.createElement('button')
    const btnImg = document.createElement(`img`)
    btnEdit.classList.add('btn-edit')
    btnImg.setAttribute(`src`, `images/icon-edit.png`);
    btnImg.classList.add('btn-img')
    btnEdit.addEventListener(`click`, (event) => {
        const cardNum = event.target.closest('[data]').getAttribute(`data`);
        fetch(`https://ajax.test-danit.com/api/v2/cards/${cardNum}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(`token`)}`
            },
        }).then(res => res.json())
            .then((data) => {

                blur()

                if (data.NameDoctor === `Cardiologist`) {
                    new EditModalCard().VisitCardiologistEdit(data.Name, data.description, data.Meta, data.BMI, data.Vice, data.Illness, data.Age, cardNum, data.select, data.stan)
                }
                if (data.NameDoctor === `Dentist`) {
                    new EditModalCard().VisitDantistEdit(data.Name, data.description, data.Meta, data.LastVisit, cardNum, data.select, data.stan)
                }
                if (data.NameDoctor === `Therapist`) {
                    new EditModalCard().VisitTherapistEdit(data.Name, data.description, data.Meta, data.Age, cardNum, data.select, data.stan)
                }



            })
    })
    btnEdit.appendChild(btnImg)
    select.append(btnEdit)
}







