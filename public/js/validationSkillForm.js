function validateForm() {
    const skillNameInput = document.getElementById('nazwa');
    const skillMinLvlInput = document.getElementById('lvl');
    const skillDescrInput = document.getElementById('opis');
    const skillErrorName = document.getElementById('errornazwa');
    const skillErrorMinLvl = document.getElementById('errorlvl');
    const skillErrorDescr = document.getElementById('erroropis');
    const skillErrorSummary = document.getElementById('errorSummary');
    resetErrors([skillNameInput, skillMinLvlInput, skillDescrInput], [skillErrorName, skillErrorMinLvl, skillErrorDescr], skillErrorSummary);
    let skillValid = true;
//sprawdzam nazwę umiejętności
    if (!checkRequired(skillNameInput.value)) {
        skillValid = false;
        skillNameInput.classList.add("error-input");
        skillErrorName.innerText = "Pole jest wymagane";

    } else if (!checkTextLengthRange(skillNameInput.value, 2, 30)) {
        skillValid = false;
        skillNameInput.classList.add("error-input");
        skillErrorName.innerText = "Pole powinno zawierać od 2 do 30 znaków";
    }
    //sprawdzam wartość poziomu



    if(!checkRequired(skillMinLvlInput.value)){
    }
    //niepotrzebne
    else if (!checkNumber(skillMinLvlInput.value)){
        skillValid = false;
        skillMinLvlInput.classList.add("error-input");
        skillErrorMinLvl.innerText = "Pole powinno być liczbą";
    }
    else if (!checkInt(skillMinLvlInput.value)){
        skillValid = false;
        skillMinLvlInput.classList.add("error-input");
        skillErrorMinLvl.innerText = "Pole powinno być liczbą całkowitą";
    }
    else if (!checkNumberRange(skillMinLvlInput.value,1,500)){
        skillValid = false;
        skillMinLvlInput.classList.add("error-input");
        skillErrorMinLvl.innerText = "Pole powinno być w zakresie od 1 do 500";
    }


    if (!checkRequired(skillDescrInput.value)) {
        skillValid = false;
        skillDescrInput.classList.add("error-input");
        skillErrorDescr.innerText = "Pole jest wymagane";

    } else if (!checkTextLengthRange(skillDescrInput.value, 10, 150)) {
        skillValid = false;
        skillDescrInput.classList.add("error-input");
        skillErrorDescr.innerText ="Pole powinno zawierać od 10 do 150 znaków";
    }


//wyświetlam generalny błąd
    if (!skillValid) {
        skillErrorSummary.innerText = "Formularz zawiera błędy";
    }
    return skillValid;
}