function validateForm() {
    const classNameInput = document.getElementById('nazwa');
    const classMaxLvlInput = document.getElementById('lvl');
    const classDateInput = document.getElementById('date');
    const classErrorName = document.getElementById('errornazwa');
    const clasErrorMaxLvl = document.getElementById('errorlvl');
    const classErrorDate = document.getElementById('errordate');
    const classErrorSummary = document.getElementById('errorSummary');
    resetErrors([classNameInput, classMaxLvlInput, classDateInput], [classErrorName, clasErrorMaxLvl, classErrorDate], classErrorSummary);
    let classValid = true;
//sprawdzam nazwę klasy
    if (!checkRequired(classNameInput.value)) {
        const reqcMessage = document.getElementById('errorMessage-required').innerText;
        classValid = false;
        classNameInput.classList.add("error-input");
        classErrorName.innerText = reqcMessage;

    } else if (!checkTextLengthRange(classNameInput.value, 2, 30)) {
        const reqcMessage = document.getElementById('errorMessage-isInCharRange2to30').innerText;
        classValid = false;
        classNameInput.classList.add("error-input");
        classErrorName.innerText = reqcMessage;
    }
    //sprawdzam wartość poziomu



    if(!checkRequired(classMaxLvlInput.value)) {
        const reqcMessage = document.getElementById('errorMessage-required').innerText;
        classValid = false;
        classMaxLvlInput.classList.add("error-input");
        clasErrorMaxLvl.innerText = reqcMessage;
    }
    //niepotrzebne
   else if (!checkNumber(classMaxLvlInput.value)){
        const reqcMessage = document.getElementById('errorMessage-isNumber').innerText;
        classValid = false;
        classMaxLvlInput.classList.add("error-input");
        clasErrorMaxLvl.innerText = reqcMessage;
    }
    else if (!checkInt(classMaxLvlInput.value)){
        const reqcMessage = document.getElementById('errorMessage-isInt').innerText;
        classValid = false;
        classMaxLvlInput.classList.add("error-input");
        clasErrorMaxLvl.innerText = reqcMessage;
    }
    else if (!checkNumberRange(classMaxLvlInput.value,5,100)){
        const reqcMessage = document.getElementById('errorMessage-isInRange5to100').innerText;
         classValid = false;
        classMaxLvlInput.classList.add("error-input");
         clasErrorMaxLvl.innerText = reqcMessage;
     }
//sprawdzam datę;
    const today = new Date(),
        tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    let month=''+(  tomorrow.getMonth()+1),
        day=''+     tomorrow.getDate(),
        year=       tomorrow.getFullYear();

    if(month.length<2)
        month='0'+month;
if(day.length<2)
    day='0'+day;
const nowString = [year,month,day].join('-');

    if(!checkRequired(classDateInput.value)){
        const reqcMessage = document.getElementById('errorMessage-required').innerText;
        classValid = false;
        classDateInput.classList.add("error-input");
        classErrorDate.innerText = reqcMessage;
    }

    //niepotrzebne
else if(!checkDate(classDateInput.value)){
        const reqcMessage = document.getElementById('errorMessage-isDate').innerText;
    classValid = false;
    classDateInput.classList.add("error-input");
    classErrorDate.innerText = reqcMessage;
}
  else  if(checkDateIfAfter(classDateInput.value,nowString)){
        const reqcMessage = document.getElementById('errorMessage-isFuture').innerText;
        classValid = false;
        classDateInput.classList.add("error-input");
        classErrorDate.innerText = reqcMessage;
    }


//wyświetlam generalny błąd
    if (!classValid) {
        const reqcMessage = document.getElementById('errorMessage-General').innerText;
        classErrorSummary.innerText = reqcMessage;
    }
    return classValid;
}