    function validateForm() {
    const sCclassInput = document.getElementById('klasa');
    const sCskillInput = document.getElementById('skill');
    const sCMinLvlInput = document.getElementById('minlvl');
    const sCMaxLvlInput  = document.getElementById('maxlvl');
    const sCErrorClass = document.getElementById('errorklasa');
    const sCErrorSkill = document.getElementById('errorskill');
    const sCErrorMinLvl = document.getElementById('minlvlerror');
    const sCErrorMaxLvl = document.getElementById('maxlvlerror');
    const sCErrorSummary = document.getElementById('errorSummary');

    resetErrors([sCclassInput, sCskillInput, sCMinLvlInput,sCMaxLvlInput], [sCErrorClass, sCErrorSkill, sCErrorMinLvl,sCErrorMaxLvl], sCErrorSummary);
    let sCValid = true;
//sprawdzam nazwę umiejętności
    if (!checkRequired(sCclassInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        sCValid = false;
        sCclassInput.classList.add("error-input");
        sCErrorClass.innerText = reqMessage;

    }
    if (!checkRequired(sCskillInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        sCValid = false;
        sCskillInput.classList.add("error-input");
        sCErrorSkill.innerText = reqMessage;
    }
    //sprawdzam maksymalny poziom
    if(!checkRequired(sCMaxLvlInput.value)){
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        sCValid = false;
        sCMaxLvlInput.classList.add("error-input");

        sCErrorMaxLvl.innerText = reqMessage;
    }
    //niepotrzebne
    else if (!checkNumber(sCMaxLvlInput.value)){
        const reqMessage = document.getElementById('errorMessage-isNumber').innerText;
        sCValid = false;
        sCMaxLvlInput.classList.add("error-input");

        sCErrorMaxLvl.innerText = reqMessage;
    }
    else if (!checkInt(sCMaxLvlInput.value)){
        const reqMessage = document.getElementById('errorMessage-isInt').innerText;
        sCValid = false;
        sCMaxLvlInput.classList.add("error-input");

        sCErrorMaxLvl.innerText = reqMessage;
    }
    else if (!checkNumberRange(sCMaxLvlInput.value,5,100)){
        const reqMessage = document.getElementById('errorMessage-isInRange5to100').innerText;
        sCValid = false;
        sCMaxLvlInput.classList.add("error-input");


        sCErrorMaxLvl.innerText = reqMessage;
        //sCErrorMaxLvl.innerText = "Pole powinno być w zakresie od 5 do 100";
    }
    //sprawdzam bazowy poziom
    if(!checkRequired(sCMinLvlInput.value)){
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        sCValid = false;
        sCMinLvlInput.classList.add("error-input");

        //sCErrorMinLvl.innerText = "Pole jest wymagane";
        sCErrorMinLvl.innerText = reqMessage;
    }
    //niepotrzebne
    else if (!checkNumber(sCMinLvlInput.value)){
        const reqMessage = document.getElementById('errorMessage-isNumber').innerText;
        sCValid = false;
        sCMinLvlInput.classList.add("error-input");

        //sCErrorMinLvl.innerText = "Pole powinno być liczbą";
        sCErrorMinLvl.innerText = reqMessage;
    }
    else if (!checkInt(sCMinLvlInput.value)){
        const reqMessage = document.getElementById('errorMessage-isInt').innerText;
        sCValid = false;
        sCMinLvlInput.classList.add("error-input");

        //sCErrorMinLvl.innerText = "Pole powinno być liczbą całkowitą";
        sCErrorMinLvl.innerText = reqMessage;
    }
    else if (!checkNumberRange(sCMinLvlInput.value,0,100)){
        const reqMessage = document.getElementById('errorMessage-isInRange0to100').innerText;
        sCValid = false;
        sCMinLvlInput.classList.add("error-input");
        //sCErrorMinLvl.innerText = "Pole powinno być w zakresie od 0 do 100";
        sCErrorMinLvl.innerText = reqMessage;
    }
    else if (!checkNumberRange(sCMinLvlInput.value,0,sCMaxLvlInput.value)){
        const reqMessage = document.getElementById('errorMessage-isHigherThanMax').innerText;
        sCValid = false;
        sCMinLvlInput.classList.add("error-input");
        //sCErrorMinLvl.innerText = "Pole nie może być większe od maksymalnego poziomu";
        sCErrorMinLvl.innerText = reqMessage;
    }


//wyświetlam generalny błąd
    if (!sCValid) {
        const reqcsMessage = document.getElementById('errorMessage-General').innerText;
        //sCErrorSummary.innerText = "Formularz zawiera błędy";
        sCErrorSummary.innerText = reqcsMessage;
    }
    return sCValid;
}