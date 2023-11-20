import {editCard} from "./EditCard.js";
import {deleteCard} from "./DeleteCard.js";

export class GetCard {
    constructor() {
        this.MainDivCard = document.createElement('div');
        this.SubDivCard = document.createElement('div')
        this.buttonEdit = document.createElement('button');
        this.buttonDelete = document.createElement('button');
        this.buttonShowMore = document.createElement('button');
        this.buttonShowLess = document.createElement('button');
        this.buttonShowMore.textContent = `Show More`;
        this.buttonShowLess.textContent = 'Show Less'
        this.buttonDelete.textContent = `Edit Card`
        this.buttonEdit.textContent = `Delete`;
        this.Therapist = document.createElement(`h3`);
        this.TherapistPasientName = document.createElement(`h2`);
        this.TherapistPSelect = document.createElement(`p`);
        this.TherapistDescription = document.createElement(`p`);
        this.TherapistMeta = document.createElement(`p`);
        this.TherapistInputAgeTeraphist = document.createElement(`p`);
        this.Cardiologist = document.createElement(`h3`);
        this.CardiologistPasienName = document.createElement(`h2`);
        this.CardiologistSelect = document.createElement(`p`);
        this.CardiologistDescription = document.createElement(`p`);
        this.CardiologistMeta = document.createElement(`p`);
        this.CardiologistBMI = document.createElement(`p`);
        this.CardiologistVice = document.createElement(`p`);
        this.CardiologistIllness = document.createElement(`p`);
        this.CardiologistAge = document.createElement(`p`);
        this.Dentist = document.createElement(`h3`);
        this.DentistPasientName = document.createElement(`h2`);
        this.DentistSelect = document.createElement(`p`);
        this.DentistDescription = document.createElement(`p`);
        this.DentistMeta = document.createElement(`p`);
        this.DentistLastVisit = document.createElement(`p`);
        this.MainDivCard.classList.add('main-card')
        this.SubDivCard.classList.add('sub-card')
        this.SubDivCard.append(this.buttonShowMore, this.buttonShowLess);
        document.querySelector(`main`).append(this.MainDivCard);
    }


    createDentist(NameDoctor, select, Name, description, Meta, LastVisit, id, Stan = `Open`) {
        this.DentistLastVisit.textContent = `Останній візит : ${LastVisit}`
        this.DentistMeta.textContent = `Мета: ${Meta}`
        this.DentistDescription.textContent = `Опис: ${description}`
        this.DentistPasientName.textContent = `ПІБ: ${Name}`
        this.Dentist.textContent = `Лікар: ${NameDoctor}`
        this.DentistSelect.textContent = `Терміновість: ${select}`
        this.divBtn = document.createElement((`div`))
        this.divBtn.classList.add(`div-btn`)
        this.MainDivCard.append(this.divBtn);
        editCard(this.divBtn);
        deleteCard(this.MainDivCard, this.divBtn);
        this.MainDivCard.setAttribute(`data`, id)
        const stan = document.createElement(`p`);
        stan.textContent = `${Stan}`;
        stan.classList.add(`open-stan`);

        if (select === `звичайна`) {
            this.MainDivCard.classList.add("low-select")
        } else if (select === `пріорітетна`) {
            this.MainDivCard.classList.add("normal-select")
        } else if (select === `Терміново`) {
            this.MainDivCard.classList.add("high-select")
        }

        this.MainDivCard.append(stan, this.Dentist, this.DentistPasientName, this.SubDivCard, this.buttonShowMore)
        this.SubDivCard.append(this.DentistLastVisit, this.DentistMeta, this.DentistDescription, this.DentistSelect, this.buttonShowLess)
        this.toggleReadMoreLess()
    }


    createCardiologist(NameDoctor, select, Name, description, Meta, BMI, Vice, Illness, Age, id, Stan = `Open`) {
        this.Cardiologist.textContent = `Лікар: ${NameDoctor}`;
        this.CardiologistPasienName.textContent = `ПІБ: ${Name}`;
        this.CardiologistSelect.textContent = `Терміновість: ${select}`;
        this.CardiologistDescription.textContent = `Опис: ${description}`;
        this.CardiologistMeta.textContent = `Мета: ${Meta}`;
        this.CardiologistBMI.textContent = `Масса тіла: ${BMI}`;
        this.CardiologistVice.textContent = `Тиск: ${Vice}`;
        this.CardiologistIllness.textContent = `Перенесені Захворювання: ${Illness}`;
        this.CardiologistAge.textContent = `Вік: ${Age}`;

        const stan = document.createElement(`p`);
        stan.textContent = `${Stan}`;
        stan.classList.add(`open-stan`);

        this.id = id;
        this.MainDivCard.setAttribute(`data`, `${id}`)
        this.divBtn = document.createElement((`div`))
        this.divBtn.classList.add(`div-btn`)
        this.MainDivCard.append(this.divBtn);
        editCard(this.divBtn);
        deleteCard(this.MainDivCard, this.divBtn);

        if (select === `звичайна`) {
            this.MainDivCard.classList.add("low-select")
        } else if (select === `пріорітетна`) {
            this.MainDivCard.classList.add("normal-select")
        } else if (select === `Терміново`) {
            this.MainDivCard.classList.add("high-select")
        }

        this.MainDivCard.append(stan, this.Cardiologist, this.CardiologistPasienName, this.SubDivCard, this.buttonShowMore)
        this.SubDivCard.append(this.CardiologistAge, this.CardiologistBMI, this.CardiologistIllness, this.CardiologistVice, this.CardiologistMeta, this.CardiologistDescription, this.CardiologistSelect, this.buttonShowLess)
        this.toggleReadMoreLess()
    }

    createTherapist(NameDoctor, select, pasient, description, Meta, age, id, Stan = `Open`) {
        this.TherapistInputAgeTeraphist.textContent = `Вік : ${age}`
        this.TherapistMeta.textContent = `Мета: ${Meta}`
        this.TherapistDescription.textContent = `Опис: ${description}`
        this.TherapistPasientName.textContent = `ПІБ: ${pasient}`
        this.Therapist.textContent = `Лікар: ${NameDoctor}`
        this.TherapistPSelect.textContent = `Терміновість: ${select}`
        this.MainDivCard.setAttribute(`data`, `${id}`)

        const stan = document.createElement(`p`);
        stan.textContent = `${Stan}`;
        stan.classList.add(`open-stan`);

        this.divBtn = document.createElement((`div`))
        this.divBtn.classList.add(`div-btn`)
        this.MainDivCard.append(this.divBtn);
        editCard(this.divBtn);
        deleteCard(this.MainDivCard, this.divBtn);

        if (select === `звичайна`) {
            this.MainDivCard.classList.add("low-select")
        } else if (select === `пріорітетна`) {
            this.MainDivCard.classList.add("normal-select")
        } else if (select === `Терміново`) {
            this.MainDivCard.classList.add("high-select")
        }

        this.MainDivCard.append(stan, this.Therapist, this.TherapistPasientName, this.SubDivCard, this.buttonShowMore)
        this.SubDivCard.append(this.TherapistPSelect, this.TherapistDescription, this.TherapistMeta, this.TherapistInputAgeTeraphist, this.buttonShowLess)
        this.toggleReadMoreLess()
    }

    toggleReadMoreLess() {
        const subDiv = this.SubDivCard;
        const btnMore = this.buttonShowMore;
        const btnLess = this.buttonShowLess;

        subDiv.style.display = 'none'
        btnMore.addEventListener('click', () => {
            subDiv.style.display = 'block';
        })
        btnLess.addEventListener('click', () => {
            subDiv.style.display = 'none';
        })
    }


}
