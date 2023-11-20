import {blurClose, unBlur} from "../functions/Blur.js";
import {GetCard} from "../api/GetCard.js";


export class EditModalCard {
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
        this.inputBMI.setAttribute('placeholder', 'Звичайний тиск');
        this.inputVice.setAttribute('placeholder', 'Індекс маси тіла');
        this.inputIllness.setAttribute('placeholder', 'Перенесені Захворювання');
        this.inputAge.setAttribute('type', 'number');
        this.inputAge.setAttribute(`placeholder`, `Вік`);
        window.addEventListener(`click`, (event) => {
            if (event.target.classList.contains(`blur-wrapper`)) {
                this.closeModalCard(this.wrapperDiv);
            }
        })
    }

    selectRemember(Selected) {
        const selectedOptions = {
            'звичайна': this.optionLow,
            'пріорітетна': this.optionStandart,
            'Терміново': this.optionUrgency
        };

        if (Selected in selectedOptions) {
            const selectedOption = selectedOptions[Selected];
            selectedOption.setAttribute('selected', 'selected');
            this.optionLChoose.textContent = selectedOption.textContent;
        }
    }

    closeModalCard(wrapper) {
        wrapper?.remove();
        unBlur();

    }


    // =====================================================================[CARDIOLOGIST]==================================================================================================
    VisitCardiologistEdit(name, description, Meta, BMI, Vice, Illness, Age, cardId, Selected, Stan) {
        const wrapper = this.wrapperDiv;


        const form = this.form;
        const inputName = this.inputName;
        inputName.value = `${name}`;
        const textareaDisc = this.textareaDisc;
        textareaDisc.value = `${description}`;
        const textareaMeta = this.textareaMeta;
        textareaMeta.value = `${Meta}`;
        const select = this.select;
        select.value = `${Selected}`;
        const optionLow = this.optionLow;
        const optionLChoose = this.optionLChoose;
        const optionStandart = this.optionStandart;
        const optionUrgency = this.optionUrgency;
        const lastDiv = this.lastDiv;
        const inputBMI = this.inputBMI
        inputBMI.value = `${BMI}`;
        const inputVice = this.inputVice
        inputVice.value = `${Vice}`
        const inputIllness = this.inputIllness
        inputIllness.value = `${Illness}`
        const inputAge = this.inputAge;
        inputAge.value = `${Age}`

        this.selectRemember(Selected);

        inputBMI.setAttribute('placeholder', 'Індекс маси тіла')
        inputVice.setAttribute('placeholder', 'Звичайний тиск')
        inputIllness.setAttribute('placeholder', 'Перенесені Захворювання')
        inputAge.setAttribute('type', 'number')
        inputAge.setAttribute(`placeholder`, `Вік`);
        lastDiv.classList.add("btn-record_wrapper")
        wrapper.classList.add(`visit__main__card`)
        inputName.classList.add(`inputName`)
        select.classList.add(`select_choose`)
        this.buttonAddCard.setAttribute(`type`, "submit")
        inputName.setAttribute(`placeholder`, `ПІБ`);
        textareaDisc.setAttribute(`placeholder`, `Короткий опис візит`);
        textareaMeta.setAttribute(`placeholder`, ' Мета візит');
        form.setAttribute(`action`, `#`);
        optionLChoose.setAttribute('hidden', 'true');
        optionLChoose.setAttribute('selected', "");
        optionLChoose.setAttribute('value', "");
        optionLChoose.textContent = ` ≡ ОБРАТИ ТЕРМІНОВІСТЬ ≡`;
        optionLow.textContent = `звичайна`
        optionStandart.textContent = `пріорітетна`
        optionUrgency.textContent = `Терміново`
        this.buttonAddCard.textContent = 'Редагувати картку';
        this.buttonCancelCard.textContent = 'Відмінити';


        const stan = document.createElement(`select`);
//
        const optionOpen = document.createElement(`option`);
        const optionClose = document.createElement(`option`)
        optionOpen.setAttribute(`value`, `Open`);
        optionOpen.textContent = `Open`
        optionClose.setAttribute(`value`, `Close`);
        optionClose.textContent = `Close`
        stan.append(optionOpen, optionClose)


        const SelectCheck = (Selected) => {
            const selectedOptions = {
                'Open': optionOpen,
                'Close': optionClose,
            };

            if (Selected in selectedOptions) {
                const selectedOption = selectedOptions[Selected];
                selectedOption.setAttribute('selected', 'selected');
                stan.value = selectedOption.textContent;
            }
        }
        SelectCheck(Stan);

        select.append(optionLChoose, optionLow, optionStandart, optionUrgency);
        lastDiv.append(this.buttonAddCard, this.buttonCancelCard);
        form.append(stan, inputName, textareaDisc, textareaMeta, select, lastDiv);
        wrapper.append(form);
        document.querySelector(`body`).append(wrapper);
        this.form.appendChild(this.inputBMI);
        this.form.appendChild(this.inputAge);
        this.form.appendChild(this.inputVice);
        this.form.appendChild(this.inputIllness);
        this.form.appendChild(this.lastDiv);

        this.buttonAddCard.addEventListener(`click`, () => {
            event.preventDefault()

            const allInForm = document.querySelectorAll(`input , textarea , select `);
            allInForm.forEach((el) => {
                el.classList.remove(`active`);
                if (el.value === `` || el.value === `≡ ОБРАТИ ТЕРМІНОВІСТЬ ≡`) {
                    el.classList.add(`active`);

                }
            })

            if (inputName.value.trim() && textareaDisc.value.trim() && textareaMeta.value.trim() && select.value !== `≡ ОБРАТИ ТЕРМІНОВІСТЬ ≡` && select.value.trim() && inputVice.value.trim() && inputIllness.value.trim() && inputAge.value.trim() && inputBMI.value.trim()) {
                fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem(`token`)}`
                    },
                    body: JSON.stringify({
                        id: cardId,
                        Name: `${inputName.value}`,
                        description: `${textareaDisc.value}`,
                        NameDoctor: 'Cardiologist',
                        Meta: `${textareaMeta.value}`,
                        Vice: `${inputVice.value}`,
                        Illness: `${inputIllness.value}`,
                        Age: `${inputAge.value}`,
                        BMI: `${inputBMI.value}`,
                        select: `${select.value}`,
                        stan: `${stan.value}`
                    })

                }).then(data => data.json()).then(res => {
                        const searchData = '[data="' + cardId + '"]'
                        const deleteEditCard = document.querySelector(searchData).remove()
                        let cards = new GetCard();
                        cards.createCardiologist(res.NameDoctor, res.select, res.Name, res.description, res.Meta, res.BMI, res.Vice, res.Illness, res.Age, res.id, res.stan)
                        this.closeModalCard(this.wrapperDiv);
                    }
                )
            }
        })

        this.buttonCancelCard.addEventListener(`click`, () => {
            this.closeModalCard(this.wrapperDiv);
        })

    }

    // =====================================================================[DANTIST]=======================================================================================================
    VisitDantistEdit(name, description, Meta, lastVisit, cardId, Selected, Stan = `Open`) {
        this.select.innerHTML = ` `
        const wrapper = this.wrapperDiv;
        const form = this.form;
        const inputName = this.inputName;
        inputName.value = `${name}`
        const textareaDisc = this.textareaDisc;
        textareaDisc.value = `${description}`
        const textareaMeta = this.textareaMeta;
        textareaMeta.value = `${Meta}`
        const select = this.select;
        select.value = `${Selected}`;
        const optionLow = this.optionLow;
        const optionLChoose = this.optionLChoose;
        const optionStandart = this.optionStandart;
        const optionUrgency = this.optionUrgency;
        const lastDiv = this.lastDiv;
        const inputLastVisit = this.inputLastVisit
        inputLastVisit.value = `${lastVisit}`
        inputLastVisit.setAttribute(`placeholder`, `Дата останього візиту`);
        lastDiv.classList.add("btn-record_wrapper");
        wrapper.classList.add(`visit__main__card`);
        inputName.classList.add(`inputName`);
        select.classList.add(`select_choose`);


        const stan = document.createElement(`select`);
        const optionOpen = document.createElement(`option`);
        const optionClose = document.createElement(`option`)
        optionOpen.setAttribute(`value`, `Open`);
        optionOpen.textContent = `Open`;
        optionClose.setAttribute(`value`, `Close`);
        optionClose.textContent = `Close`;
        stan.append(optionOpen, optionClose)

        const SelectCheck = (Selected) => {
            const selectedOptions = {
                'Open': optionOpen,
                'Close': optionClose,
            };

            if (Selected in selectedOptions) {
                const selectedOption = selectedOptions[Selected];
                selectedOption.setAttribute('selected', 'selected');
                stan.value = selectedOption.textContent;
            }
        }
        SelectCheck(Stan);

        this.selectRemember(Selected);

        this.buttonAddCard.setAttribute(`type`, "submit")
        inputName.setAttribute(`placeholder`, `ПІБ`);
        textareaDisc.setAttribute(`placeholder`, `Короткий опис візит`)
        textareaMeta.setAttribute(`placeholder`, ' Мета візит')
        form.setAttribute(`action`, `#`);
        optionLChoose.setAttribute('hidden', 'true');
        optionLChoose.setAttribute('selected', "");
        optionLChoose.setAttribute('value', "");
        optionLChoose.textContent = ` ≡ ОБРАТИ ТЕРМІНОВІСТЬ ≡`;
        optionLow.textContent = `звичайна`
        optionStandart.textContent = `пріорітетна`
        optionUrgency.textContent = `Терміново`
        this.buttonAddCard.textContent = 'Редагувати картку';
        this.buttonCancelCard.textContent = 'Відмінити';


        select.append(optionLChoose, optionLow, optionStandart, optionUrgency);
        lastDiv.append(this.buttonAddCard, this.buttonCancelCard);
        form.append(stan, inputName, textareaDisc, textareaMeta, select, lastDiv,);
        wrapper.append(form);
        document.querySelector(`body`).append(wrapper);
        this.form.appendChild(this.inputLastVisit);
        this.form.appendChild(this.lastDiv);

        this.buttonAddCard.addEventListener(`click`, () => {
            event.preventDefault()

            const allInForm = document.querySelectorAll(`input , textarea , select `);
            allInForm.forEach((el) => {
                el.classList.remove(`active`);
                if (el.value === `` || el.value === `≡ ОБРАТИ ТЕРМІНОВІСТЬ ≡`) {
                    el.classList.add(`active`);

                }
            })

            if (this.inputName.value.trim() && this.textareaDisc.value.trim() && this.textareaMeta.value.trim() && this.select.value !== `≡ ОБРАТИ ТЕРМІНОВІСТЬ ≡` && this.select.value.trim() && this.inputLastVisit.value.trim()) {
                fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem(`token`)}`
                    },
                    body: JSON.stringify({
                        id: cardId,
                        Name: `${inputName.value}`,
                        description: `${textareaDisc.value}`,
                        NameDoctor: 'Dentist',
                        Meta: `${textareaMeta.value}`,
                        LastVisit: `${inputLastVisit.value}`,
                        select: `${select.value}`,
                        stan: `${stan.value}`
                    })
                }).then(data => data.json())
                    .then(res => {
                            const searchData = '[data="' + cardId + '"]'
                            const deleteEditCard = document.querySelector(searchData).remove()
                            let cards = new GetCard();
                            cards.createDentist(res.NameDoctor, res.select, res.Name, res.description, res.Meta, res.LastVisit, res.id, res.stan)
                            this.closeModalCard(this.wrapperDiv);
                        }
                    )
            }

        })

        this.buttonCancelCard.addEventListener(`click`, () => {
            this.closeModalCard(this.wrapperDiv);
        })
    }

    // =====================================================================[THERAPIST]=====================================================================================================
    VisitTherapistEdit(name, description, Meta, Age, cardId, Selected, Stan = `Open`) {
        this.select.innerHTML = ` `
        const wrapper = this.wrapperDiv;
        const form = this.form;
        const inputName = this.inputName;
        inputName.value = `${name}`
        const textareaDisc = this.textareaDisc;
        textareaDisc.value = `${description}`
        const textareaMeta = this.textareaMeta;
        textareaMeta.value = `${Meta}`;
        const select = this.select;
        select.value = `${Selected}`;
        const inputAgeTeraphist = this.inputAgeTeraphist;
        inputAgeTeraphist.value = `${Age}`;
        const optionLow = this.optionLow;
        const optionLChoose = this.optionLChoose;
        const optionStandart = this.optionStandart;
        const optionUrgency = this.optionUrgency;
        const lastDiv = this.lastDiv;
        lastDiv.classList.add("btn-record_wrapper");
        wrapper.classList.add(`visit__main__card`);
        inputName.classList.add(`inputName`);
        select.classList.add(`select_choose`);
        this.buttonAddCard.setAttribute(`type`, "submit");
        inputName.setAttribute(`placeholder`, `ПІБ`);
        textareaDisc.setAttribute(`placeholder`, `Короткий опис візит`);
        textareaMeta.setAttribute(`placeholder`, ' Мета візит');
        this.inputAgeTeraphist.setAttribute(`placeholder`, `Вік`);
        form.setAttribute(`action`, `#`);
        optionLChoose.setAttribute('hidden', 'true');
        optionLChoose.setAttribute('selected', "");
        optionLChoose.setAttribute('value', "");
        optionLChoose.textContent = ` ≡ ОБРАТИ ТЕРМІНОВІСТЬ ≡`;
        optionLow.textContent = `звичайна`;
        optionStandart.textContent = `пріорітетна`;
        optionUrgency.textContent = `Терміново`;
        this.buttonAddCard.textContent = 'Редагувати картку';
        this.buttonCancelCard.textContent = 'Відмінити';
        const stan = document.createElement(`select`);
        const optionOpen = document.createElement(`option`);
        const optionClose = document.createElement(`option`)
        optionOpen.setAttribute(`value`, `Open`);
        optionOpen.textContent = `Open`
        optionClose.setAttribute(`value`, `Close`);
        optionClose.textContent = `Close`
        stan.append(optionOpen, optionClose)
        const SelectCheck = (Selected) => {
            const selectedOptions = {
                'Open': optionOpen,
                'Close': optionClose,
            };

            if (Selected in selectedOptions) {
                const selectedOption = selectedOptions[Selected];
                selectedOption.setAttribute('selected', 'selected');
                stan.value = selectedOption.textContent;
            }
        }
        SelectCheck(Stan);
        select.append(optionLChoose, optionLow, optionStandart, optionUrgency);
        lastDiv.append(this.buttonAddCard, this.buttonCancelCard);
        form.append(stan, inputName, textareaDisc, textareaMeta, select, lastDiv);
        wrapper.append(form);
        document.querySelector(`body`).append(wrapper);
        this.form.appendChild(this.inputAgeTeraphist);
        this.form.appendChild(this.lastDiv);


        this.selectRemember(Selected);

        this.buttonAddCard.addEventListener(`click`, () => {
            event.preventDefault()

            const allInForm = document.querySelectorAll(`input , textarea , select `);
            allInForm.forEach((el) => {
                el.classList.remove(`active`);
                if (el.value === `` || el.value === `≡ ОБРАТИ ТЕРМІНОВІСТЬ ≡`) {
                    el.classList.add(`active`);

                }
            })

            if (this.inputName.value.trim() && this.textareaDisc.value.trim() && this.textareaMeta.value.trim() && this.select.value !== `≡ ОБРАТИ ТЕРМІНОВІСТЬ ≡` && this.select.value.trim() && this.inputAgeTeraphist.value.trim()) {
                fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem(`token`)}`
                    },
                    body: JSON.stringify({
                        id: cardId,
                        Name: `${inputName.value}`,
                        description: `${textareaDisc.value}`,
                        NameDoctor: 'Therapist',
                        Meta: `${textareaMeta.value}`,
                        Age: `${inputAgeTeraphist.value}`,
                        select: `${select.value}`,
                        stan: `${stan.value}`
                    })
                }).then(data => data.json())
                    .then(res => {
                            const searchData = '[data="' + cardId + '"]'
                            const deleteEditCard = document.querySelector(searchData).remove()
                            let cards = new GetCard();
                            cards.createTherapist(res.NameDoctor, res.select, res.Name, res.description, res.Meta, res.Age, res.id, res.stan)
                            this.closeModalCard(this.wrapperDiv);
                        }
                    )
            }
        })

        this.buttonCancelCard.addEventListener(`click`, () => {
            this.closeModalCard(this.wrapperDiv);
        })
    }
}

