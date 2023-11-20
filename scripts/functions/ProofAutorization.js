import {Modal} from "../classes/Modal.js";

export function proofAutorization (){
    document.getElementById(`logOut`).addEventListener('click', () => {
        if (!document.getElementById(`btnOpen`)){
            new Modal().authorization();
        }
    })}
