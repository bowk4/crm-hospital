import {MainVisitDoctor} from "./MainVisitDoctor.js";
import {GetCard} from "../api/GetCard.js";
import {blur} from "../functions/Blur.js";
import {unBlur} from "../functions/Blur.js";
import {unAuthorization} from "../functions/LogOut.js";
import {proofAutorization} from "../functions/ProofAutorization.js";

export class Modal {
    constructor() {
        this.div = document.createElement('div');
        this.h2 = document.createElement('h2');
        this.main = document.querySelector((`main`));

    }

    authorization() {
        const btnOpen = document.createElement((`button`));
        const inputFirst = document.createElement((`input`));
        const inputSecond = document.createElement((`input`));
        const btnSingIn = document.createElement((`button`));

        btnOpen.id = `btnOpen`;
        btnOpen.innerText = 'Увійти';
        btnOpen.addEventListener(`click`, () => {
            blur();
            window.addEventListener(`click` , (event)=>{
                if (event.target.classList.contains(`blur-wrapper`)){
                    wrapper?.remove();
                    unBlur();
                }
            })
            const wrapper = document.createElement((`div`));
            const h2 = document.createElement((`h2`));
            this.main.append((wrapper))
            h2.textContent = `Авторизація`;
            wrapper.classList.add(`login-wrapper`);
            inputFirst.setAttribute('placeholder', 'ПОШТА');
            inputSecond.setAttribute('placeholder', 'ПАРОЛЬ');
            inputFirst.setAttribute('type', 'email');
            inputSecond.setAttribute('type', 'password');
            btnSingIn.innerText = 'Увійти';
            wrapper.append(h2, inputFirst, inputSecond, btnSingIn);


            btnSingIn.addEventListener(`click`, () => {
                proofAutorization()

                blur();
                let inputFirstValue = inputFirst.value;
                let inputSecondValue = inputSecond.value;

                if (!inputFirstValue.trim() || !inputSecondValue.trim()) {
                    const allInputs = document.querySelectorAll(`input`);

                    let bool = true;
                    allInputs.forEach((elem) => {
                        if (!elem.value.trim()) {
                            elem.classList.add(`active`);
                            if (bool === true) {
                                bool = false;
                                const existingError = document.querySelector('.modal-visit__p');

                                if (!existingError) {
                                    const p = document.createElement('p');
                                    p.classList.add('modal-visit__p');
                                    p.innerText = 'Incorrect Password or Login';
                                    wrapper.append(p);
                                }
                            }
                        }
                    });
                    return;
                }



                if (inputFirstValue.trim() && inputSecondValue.trim()) {
                    fetch("https://ajax.test-danit.com/api/v2/cards/login", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({email: `${inputFirstValue}`, password: `${inputSecondValue}`})
                    })
                        .then(response => response.text())
                        .then(token => {
                            if (token !== 'Incorrect username or password' && token !== `Validation failed for argument [0] in public java.lang.String ua.com.danit.cards.controller.StepCardsV2Controller.loginUser(ua.com.danit.cards.dto.AuthRequest) with 2 errors: [Field error in object 'authRequest' on field 'password': rejected value []; codes [NotEmpty.authRequest.password,NotEmpty.password,NotEmpty.java.lang.String,NotEmpty]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [authRequest.password,password]; arguments []; default message [password]]; default message [не может быть пусто]] [Field error in object 'authRequest' on field 'email': rejected value []; codes [NotEmpty.authRequest.email,NotEmpty.email,NotEmpty.java.lang.String,NotEmpty]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [authRequest.email,email]; arguments []; default message [email]]; default message [не может быть пусто]] `) {
                                localStorage.setItem("token", `${token}`);
                                localStorage.setItem("autoriz", true);
                            }


                            fetch("https://ajax.test-danit.com/api/v2/cards", {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem(`token`)}`
                                }
                            }).then(res => {

                                if (res.status === 200) {
                                    return res.json();
                                } else {

                                    const allInputs = document.querySelectorAll(`input`);
                                    allInputs.forEach((elem) => {

                                        elem.classList.add(`active`);
                                    })
                                }
                            })
                                .then(data => {
                                    data.forEach((el) => {
                                        if (el.NameDoctor === `Dentist`) {
                                            let getCard = new GetCard()
                                            getCard.createDentist(el.NameDoctor, el.select, el.Name, el.description, el.Meta, el.LastVisit, el.id)
                                        }
                                        if (el.NameDoctor === `Therapist`) {
                                            let getCard = new GetCard()
                                            getCard.createTherapist(el.NameDoctor, el.select, el.Name, el.description, el.Meta, el.Age, el.id)
                                        }
                                        if (el.NameDoctor === `Cardiologist`) {
                                            let getCard = new GetCard()
                                            getCard.createCardiologist(el.NameDoctor, el.select, el.Name, el.description, el.Meta, el.Age, el.BMI, el.Vice, el.Illness, el.id)
                                        }

                                    })

                                    unBlur();
                                    document.querySelector(`.login-wrapper`).remove();
                                    btnOpen.remove()
                                    unAuthorization(btnOpen)
                                    document.getElementById('addVisit').style.display = "inline";
                                    document.getElementById(`logOut`).style.display = "inline";
                                    document.querySelector(`.filter-section`).style.display = "block";
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        }).catch(err => {
                        console.log(err.message)
                    })
                }
            })

        });
        document.querySelector(`header`).append((btnOpen))
    }
}

if (!localStorage.getItem(`autoriz`)) {

}


