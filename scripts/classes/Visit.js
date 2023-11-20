import {MainVisitDoctor} from "./MainVisitDoctor.js";
import {VisitDentist} from "./VisitDentist.js";
import {VisitTeraphist} from "./VisitTeraphist.js";
import {VisitCardiologist} from "./VisitCardiologist.js";
import {blur, unBlur ,} from "../functions/Blur.js";



export class Visit  {
    constructor() {
        this.mainVisitDoctor = new MainVisitDoctor();
        this.visitDentist = new VisitDentist(this.mainVisitDoctor);
        this.visitTeraphist = new VisitTeraphist(this.mainVisitDoctor);
        this.visitCardiologist = new VisitCardiologist(this.mainVisitDoctor);
        this.main = document.querySelector("main")
        this.btnVisitAdd = document.getElementById("addVisit");
        this.divDoctor = document.createElement(`div`)
        this.divDoctor.classList.add('select-doctor')
        this.h2 = document.createElement('h2')
        this.selectDoctor = document.createElement(`select`);
        this.optionSelect = document.createElement('option');
        this.optionCardio = document.createElement('option');
        this.optionDentist = document.createElement('option');
        this.optionTherap = document.createElement('option');
        this.buttonCancel = document.createElement('button');
        this.buttonCancel .addEventListener(`click` , ()=>{
            visit.closeModal(this.divDoctor);
            unBlur();
        })
    }

    openModal = () => {
        this.selectDoctor.innerHTML = ``;
        const divDoctor= this.divDoctor;
        const selectDoctor    = this.selectDoctor;
        const optionSelect    = this.optionSelect;
        const optionCardio    = this.optionCardio;
        const optionDentist   = this.optionDentist;
        const optionTherap    = this.optionTherap;
        const buttonCancel    = this.buttonCancel;
        this.optionSelect.setAttribute('selected', "");
        this.optionSelect.setAttribute('value', "");
        buttonCancel.textContent = `Cancel`;
        optionSelect.textContent = ``
        optionCardio.textContent = ``
        optionDentist.textContent = ``
        optionTherap.textContent =  ``
        buttonCancel.classList.add(`btn-decline`)
        optionSelect.textContent =  ` ≡ ОБРАТИ ЛІКАРЯ ≡`;
        optionCardio.textContent =  `кардіолог`;
        optionDentist.textContent =  `дантист`;
        optionTherap.textContent =  `терапевт`;
        document.querySelector(`body`).addEventListener(`click` ,  (event)=>{
            if (event.target ===  document.querySelector(`.blur-wrapper`)){
                this.mainVisitDoctor.closeModalCard(this.divDoctor)
                unBlur()
            }
        })
        selectDoctor.addEventListener("change", (event) => {
            

            if (event.target.value === "кардіолог") {
                this.visitCardiologist.createVisitCardiologist();
                this.mainVisitDoctor.closeModalCard(this.divDoctor)
                blur()
            } else if (event.target.value === "дантист") {
                this.visitDentist.createVisitDentist();
                this.mainVisitDoctor.closeModalCard(this.divDoctor)
                blur()
            } else if (event.target.value === "терапевт") {
                this.visitTeraphist.createVisitTherapist();
                this.mainVisitDoctor.closeModalCard(this.divDoctor)
                blur()
            }
        });

        selectDoctor.append(optionSelect, optionCardio, optionDentist , optionTherap)
        divDoctor.append(selectDoctor , buttonCancel)
        document.querySelector(`body`).append(divDoctor)
        selectDoctor.value = "";
    }

    closeModal(wrapper) {
        wrapper?.remove();
    }

}

const visit = new Visit();
document.getElementById(`addVisit`).addEventListener(`click` , () => {
    visit.openModal()
    blur()
})



