import {MainVisitDoctor} from "./MainVisitDoctor.js";


export class VisitCardiologist extends MainVisitDoctor {
    constructor() {
        super();
        this.inputBMI = document.createElement('input')
        this.inputVice = document.createElement('input')
        this.inputIllness = document.createElement('input')
        this.inputAge = document.createElement('input')
        this.inputBMI.setAttribute('placeholder', 'Індекс маси тіла ')
        this.inputVice.setAttribute('placeholder', 'Звичайний тиск')
        this.inputIllness.setAttribute('placeholder', 'Перенесені Захворювання ')
        this.inputAge.setAttribute('type', 'number')
        this.inputAge.setAttribute(`placeholder`, `Вік`);
    }

    createVisitCardiologist = () => {
        this.createVisit();
        this.form.appendChild(this.inputBMI)
        this.form.appendChild(this.inputIllness);
        this.form.appendChild(this.inputVice);
        this.form.appendChild(this.inputAge);
        this.form.appendChild(this.lastDiv);
    }
}