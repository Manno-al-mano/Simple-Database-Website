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
        sCValid = false;
        sCclassInput.classList.add("error-input");
        sCErrorClass.innerText = "Pole jest wymagane";

    }
    if (!checkRequired(sCskillInput.value)) {
        sCValid = false;
        sCskillInput.classList.add("error-input");
        sCErrorSkill.innerText = "Pole jest wymagane";
    }
    //sprawdzam maksymalny poziom
    if(!checkRequired(sCMaxLvlInput.value)){
        sCValid = false;
        sCMaxLvlInput.classList.add("error-input");
        sCErrorMaxLvl.innerText = "Pole jest wymagane";
    }
    //niepotrzebne
    else if (!checkNumber(sCMaxLvlInput.value)){
        sCValid = false;
        sCMaxLvlInput.classList.add("error-input");
        sCErrorMaxLvl.innerText = "Pole powinno być liczbą";
    }
    else if (!checkInt(sCMaxLvlInput.value)){
        sCValid = false;
        sCMaxLvlInput.classList.add("error-input");
        sCErrorMaxLvl.innerText = "Pole powinno być liczbą całkowitą";
    }
    else if (!checkNumberRange(sCMaxLvlInput.value,5,100)){
        sCValid = false;
        sCMaxLvlInput.classList.add("error-input");
        sCErrorMaxLvl.innerText = "Pole powinno być w zakresie od 5 do 100";
    }
    //sprawdzam bazowy poziom
    if(!checkRequired(sCMinLvlInput.value)){
        sCValid = false;
        sCMinLvlInput.classList.add("error-input");
        sCErrorMinLvl.innerText = "Pole jest wymagane";
    }
    //niepotrzebne
    else if (!checkNumber(sCMinLvlInput.value)){
        sCValid = false;
        sCMinLvlInput.classList.add("error-input");
        sCErrorMinLvl.innerText = "Pole powinno być liczbą";
    }
    else if (!checkInt(sCMinLvlInput.value)){
        sCValid = false;
        sCMinLvlInput.classList.add("error-input");
        sCErrorMinLvl.innerText = "Pole powinno być liczbą całkowitą";
    }
    else if (!checkNumberRange(sCMinLvlInput.value,0,100)){
        sCValid = false;
        sCMinLvlInput.classList.add("error-input");
        sCErrorMinLvl.innerText = "Pole powinno być w zakresie od 0 do 100";
    }
    else if (!checkNumberRange(sCMinLvlInput.value,0,sCMaxLvlInput.value)){
        sCValid = false;
        sCMinLvlInput.classList.add("error-input");
        sCErrorMinLvl.innerText = "Pole nie może być większe od maksymalnego poziomu";
    }


//wyświetlam generalny błąd
    if (!sCValid) {
        sCErrorSummary.innerText = "Formularz zawiera błędy";
    }
    return sCValid;
}