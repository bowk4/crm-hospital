import {MainVisitDoctor} from "./MainVisitDoctor.js";

export class VisitDentist extends MainVisitDoctor {
    constructor() {
        super();
        this.inputLastVisit = document.createElement(`input`);
        this.inputLastVisit.setAttribute(`placeholder`, `Дата останього візиту`);
    }

    createVisitDentist = () => {
        this.createVisit();
        this.form.appendChild(this.inputLastVisit);
        this.form.appendChild(this.lastDiv);
    }
}

