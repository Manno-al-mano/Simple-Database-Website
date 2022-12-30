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
        classValid = false;
        classNameInput.classList.add("error-input");
        classErrorName.innerText = "Pole jest wymagane";

    } else if (!checkTextLengthRange(classNameInput.value, 2, 30)) {
        classValid = false;
        classNameInput.classList.add("error-input");
        classErrorName.innerText = "Pole powinno zawierać od 2 do 30 znaków";
    }
    //sprawdzam wartość poziomu



    if(!checkRequired(classMaxLvlInput.value)){
        classValid = false;
        classMaxLvlInput.classList.add("error-input");
        clasErrorMaxLvl.innerText = "Pole jest wymagane";
    }
    //niepotrzebne
   else if (!checkNumber(classMaxLvlInput.value)){
        classValid = false;
        classMaxLvlInput.classList.add("error-input");
        clasErrorMaxLvl.innerText = "Pole powinno być liczbą";
    }
    else if (!checkInt(classMaxLvlInput.value)){
        classValid = false;
        classMaxLvlInput.classList.add("error-input");
        clasErrorMaxLvl.innerText = "Pole powinno być liczbą całkowitą";
    }
    else if (!checkNumberRange(classMaxLvlInput.value,5,100)){
         classValid = false;
        classMaxLvlInput.classList.add("error-input");
         clasErrorMaxLvl.innerText = "Pole powinno być w zakresie od 5 do 100";
     }
//sprawdzam datę;
let nowDate = new Date(),
    month=''+(nowDate.getMonth()+1),
    day=''+nowDate.getDate(),
    year=nowDate.getFullYear();
    if(month.length<2)
        month='0'+month;
if(day.length<2)
    day='0'+day;
const nowString = [year,month,day].join('-');

    if(!checkRequired(classDateInput.value)){
        classValid = false;
        classDateInput.classList.add("error-input");
        classErrorDate.innerText = "Pole jest wymagane";
    }

    //niepotrzebne
else if(!checkDate(classDateInput.value)){
    classValid = false;
    classDateInput.classList.add("error-input");
    classErrorDate.innerText = "Pole powinno zawierać datę w formacie dd.mm.yyyy";
}
  else  if(checkDateIfAfter(classDateInput.value,nowString)){
        classValid = false;
        classDateInput.classList.add("error-input");
        classErrorDate.innerText = "Pole powinno nie powinno zawierać przyszłej daty";
    }


//wyświetlam generalny błąd
    if (!classValid) {
        classErrorSummary.innerText = "Formularz zawiera błędy";
    }
    return classValid;
}