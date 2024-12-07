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
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        skillValid = false;
        skillNameInput.classList.add("error-input");
        skillErrorName.innerText = reqMessage;

    } else if (!checkTextLengthRange(skillNameInput.value, 2, 30)) {
        const reqMessage = document.getElementById('errorMessage-isInCharRange2to30').innerText;
        skillValid = false;
        skillNameInput.classList.add("error-input");
        //skillErrorName.innerText = "Pole powinno zawierać od 2 do 30 znaków";
        skillErrorName.innerText = reqMessage;
    }
    //sprawdzam wartość poziomu



    if(!checkRequired(skillMinLvlInput.value)){
    }
    //niepotrzebne
    else if (!checkNumber(skillMinLvlInput.value)){
        const reqMessage = document.getElementById('errorMessage-isNumber').innerText;
        skillValid = false;
        skillMinLvlInput.classList.add("error-input");
        //skillErrorMinLvl.innerText = "Pole powinno być liczbą";
        skillErrorMinLvl.innerText = reqMessage;
    }
    else if (!checkInt(skillMinLvlInput.value)){
        const reqMessage = document.getElementById('errorMessage-isInt').innerText;
        skillValid = false;
        skillMinLvlInput.classList.add("error-input");
        skillErrorMinLvl.innerText = reqMessage;
    }
    else if (!checkNumberRange(skillMinLvlInput.value,1,500)){
        const reqMessage = document.getElementById('errorMessage-isInRange1to500').innerText;
        skillValid = false;
        skillMinLvlInput.classList.add("error-input");
        skillErrorMinLvl.innerText = reqMessage;
    }


    if (!checkRequired(skillDescrInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        skillValid = false;
        skillDescrInput.classList.add("error-input");
        skillErrorDescr.innerText = reqMessage;

    } else if (!checkTextLengthRange(skillDescrInput.value, 10, 150)) {
        const reqMessage = document.getElementById('errorMessage-isInCharRange10to150').innerText;
        skillValid = false;
        skillDescrInput.classList.add("error-input");
        skillErrorDescr.innerText =reqMessage;
    }


//wyświetlam generalny błąd
    if (!skillValid) {
        const reqMessage = document.getElementById('errorMessage-General').innerText;
        skillErrorSummary.innerText = reqMessage;
    }
    return skillValid;
}