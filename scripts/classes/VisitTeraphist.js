import {MainVisitDoctor} from "./MainVisitDoctor.js";

export class VisitTeraphist extends MainVisitDoctor {
    constructor() {
        super();
        this.inputAgeTeraphist = document.createElement(`input`);
        this.inputAgeTeraphist.id = `inputAgeTeraphist`;
        this.inputAgeTeraphist.setAttribute('type', 'number');
        this.inputAgeTeraphist.setAttribute(`placeholder`, `Вік`);
    }

    createVisitTherapist = () => {
        this.createVisit();
        this.form.appendChild(this.inputAgeTeraphist);
        this.form.appendChild(this.lastDiv);
    }
}

