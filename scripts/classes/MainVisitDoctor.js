import {GetCard} from "../api/GetCard.js";
import {unBlur} from "../functions/Blur.js";


export class MainVisitDoctor {
    constructor() {
        this.wrapperDiv = document.createElement(`div`);
        this.div = document.createElement(`div`);
        this.form = document.createElement(`form`);
        this.inputName = document.createElement(`input`);
        this.textareaDisc = document.createElement(`textarea`);
        this.textareaMeta = document.createElement(`textarea`);
        this.select = document.createElement(`select`);
        this.optionLChoose = document.createElement(`option`);
        this.optionLow = document.createElement(`option`);
        this.optionStandart = document.createElement(`option`);
        this.optionUrgency = document.createElement(`option`);
        this.wrapperDiv = document.createElement(`div`);
        this.wrapperDiv = document.createElement(`div`);
        this.lastDiv = document.createElement('div');
        this.buttonAddCard = document.createElement(`button`);
        this.buttonCancelCard = document.createElement(`button`);
        this.inputLastVisit = document.createElement(`input`);
        this.inputVice = document.createElement(`input`);
        this.inputIllness = document.createElement(`input`);
        this.inputAge = document.createElement(`input`);
        this.inputBMI = document.createElement(`input`);
        this.inputAgeTeraphist = document.createElement(`input`);
    }

    createVisit() {
        this.select.innerHTML = ` `
        const wrapper = this.wrapperDiv;
        const form = this.form;
        const inputName = this.inputName;
        const textareaDisc = this.textareaDisc;
        const textareaMeta = this.textareaMeta;
        const select = this.select;
        const optionLow = this.optionLow;
        const optionLChoose = this.optionLChoose;
        const optionStandart = this.optionStandart;
        const optionUrgency = this.optionUrgency;
        const lastDiv = this.lastDiv;

        lastDiv.classList.add("btn-record_wrapper")
        wrapper.classList.add(`visit__main__card`)
        inputName.classList.add(`inputName`)
        select.classList.add(`select_choose`)
        this.buttonAddCard.setAttribute(`type`, "submit")
        inputName.setAttribute(`placeholder`, `ПІБ`);
        textareaDisc.setAttribute(`placeholder`, `Короткий опис візит`)
        textareaMeta.setAttribute(`placeholder`,  'Мета візит')
        form.setAttribute(`action`, `#`);
        optionLChoose.setAttribute('selected', "");
        optionLChoose.setAttribute('value', "");
        optionLChoose.textContent = ` ≡ ОБРАТИ ТЕРМІНОВІСТЬ ≡`;
        optionLow.textContent = `звичайна`
        optionStandart.textContent = `пріорітетна`
        optionUrgency.textContent = `Терміново`
        this.buttonAddCard.textContent = 'Додати картку';
        this.buttonCancelCard.textContent = 'Відмінити';
        optionLow.setAttribute(`value`, `звичайна`)
        optionStandart.setAttribute(`value`, 'пріорітетна')
        optionUrgency.setAttribute('value', 'Терміново')
        select.append(optionLChoose, optionLow, optionStandart, optionUrgency);
        form.append(  inputName, textareaDisc, textareaMeta, select, lastDiv);
        wrapper.append(form);
        lastDiv.append(this.buttonAddCard, this.buttonCancelCard)
        document.querySelector(`body`).append(wrapper);
        select.value = ``;

        this.resetValue();

        this.buttonAddCard.addEventListener(`click`, this.validation)
        document.querySelector(`body`).addEventListener(`click`, (event) => {
            if (event.target === document.querySelector(`.blur-wrapper`)) {
                this.closeModalCard(this.wrapperDiv);
                unBlur()
            }
        })
        this.buttonCancelCard.addEventListener(`click`, () => {
            this.closeModalCard(this.wrapperDiv);
        })

    }

    closeModalCard(wrapper) {
        wrapper?.remove();
        unBlur();
    }

    resetValue() {
        const reset = document.querySelectorAll(`input , textarea`);
        reset.forEach((el) => {
            if (el.type !== 'hidden' && el.type !== 'submit') {
                el.value = '';
            }
        })
    }

    validation = () => {
        event.preventDefault()
        const allInForm = document.querySelectorAll(`input , textarea , select `);
        const url = "https://ajax.test-danit.com/api/v2/cards";

        allInForm.forEach((el) => {

            el.classList.remove(`active`);
            if (el.value === `` || el.value === `≡ ОБРАТИ ТЕРМІНОВІСТЬ ≡`) {
                el.classList.add(`active`)
            }
            if (el.id == `search`){
                el.classList.remove(`active`)
            }
            })

        if (this.inputName.value.trim() && this.textareaDisc.value.trim() && this.textareaMeta.value.trim() && this.select.value !== `≡ ОБРАТИ ТЕРМІНОВІСТЬ ≡` && this.select.value.trim() && this.inputLastVisit.value.trim()) {

            const name = this.inputName.value;
            const description = this.textareaDisc.value;
            const meta = this.textareaMeta.value;
            const select = this.select.value;
            const inputLastVisit = this.inputLastVisit.value

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(`token`)}`
                },
                body: JSON.stringify({
                    NameDoctor: `Dentist`,
                    Name: name,
                    select: select,
                    description: description,
                    Meta: meta,
                    LastVisit: inputLastVisit,
                    stan: `Open`
                })
            })
                .then(response => response.json())
                .then((response) => {
                    let cards = new GetCard();
                    cards.createDentist(response.NameDoctor, response.select, response.Name, response.description, response.Meta, response.LastVisit, response.id)
                    this.closeModalCard(this.wrapperDiv);
                })
        }

        if (this.inputName.value.trim() && this.textareaDisc.value.trim() && this.textareaMeta.value.trim() && this.select.value !== `≡ ОБРАТИ ТЕРМІНОВІСТЬ ≡` && this.select.value.trim() && this.inputVice.value.trim() && this.inputIllness.value.trim() && this.inputAge.value.trim() && this.inputBMI.value.trim()) {

            const name = this.inputName.value;
            const description = this.textareaDisc.value;
            const meta = this.textareaMeta.value;
            const select = this.select.value;
            const BMI = this.inputBMI.value;
            const vice = this.inputVice.value;
            const Illness = this.inputIllness.value;
            const Age = this.inputAge.value;

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(`token`)}`
                },
                body: JSON.stringify({
                    NameDoctor: `Cardiologist`,
                    Name: name,
                    select: select,
                    description: description,
                    Meta: meta,
                    BMI: BMI,
                    Vice: vice,
                    Illness: Illness,
                    Age: Age,
                    stan: `Open`
                })
            })
                .then(response => response.json())
                .then((res) => {
                    let cards = new GetCard();
                    cards.createCardiologist(res.NameDoctor, res.select, res.Name, res.description, res.Meta, res.BMI, res.Vice, res.Illness, res.Age, res.id )
                    this.closeModalCard(this.wrapperDiv);
                })
        }

        if (this.inputName.value.trim() && this.textareaDisc.value.trim() && this.textareaMeta.value.trim() && this.select.value !== `≡ ОБРАТИ ТЕРМІНОВІСТЬ ≡` && this.select.value.trim() && this.inputAgeTeraphist.value.trim()) {
            const name = this.inputName.value;
            const description = this.textareaDisc.value;
            const select = this.select.value;
            const meta = this.textareaMeta.value;
            const inputAgeTeraphist = this.inputAgeTeraphist.value;

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(`token`)}`
                },
                body: JSON.stringify({
                    NameDoctor: `Therapist`,
                    Name: name,
                    select: select,
                    description: description,
                    Meta: meta,
                    Age: inputAgeTeraphist,
                    stan: `Open`
                })
            })
                .then(response => response.json())
                .then((response) => {
                    let cards = new GetCard();
                    cards.createTherapist(response.NameDoctor, response.select, response.Name, response.description, response.Meta, response.Age, response.id)
                    this.closeModalCard(this.wrapperDiv);
                })
        }
    }

}

const main = new MainVisitDoctor()
