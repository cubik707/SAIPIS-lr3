let formData = {};

document.addEventListener("DOMContentLoaded",() => {
    const form = document.forms["main"];
    const nameInput = form.elements["name"];
    const numberInput = form.elements["number"];
    const emailInput = form.elements["email"];
    const radioInputs = form.elements["gender"];
    const checkboxInputs = form.querySelectorAll('input[type="checkbox"]');
    const selectInput = form.elements["portal"];
    const weekInput = form.elements["week"];
    const reviewInput = form.elements["review"];
    const submitBtn = form.querySelector(".send-btn");

    // Функция для валидации email
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Функция для валидации номера телефона
    function isValidPhoneNumber(phone) {
        return /^(\+?\d{1,3})?[- ]?\d{2,3}[- ]?\d{2,3}[- ]?\d{2,3}[- ]?\d{2,3}$/.test(phone);
    }

    // Функция для проверки заполненности всех обязательных полей
    function validateForm() {
        const isValidName = nameInput.value.trim() !== "";
        const isValidEmailValue = isValidEmail(emailInput.value.trim());
        const isValidPhoneNumberValue = isValidPhoneNumber(numberInput.value.trim());

        return isValidName && isValidEmailValue && isValidPhoneNumberValue;
    }

    // Функция для получения выбранных значений checkbox
    function getCheckedValues(checkboxes) {
        let values = [];
        checkboxes.forEach((checkbox) => {
            if(checkbox.checked) {
                values.push(checkbox.value);
            }
        });
        return values;
    }

    // Функция для получения выбранного значения radio
    function getSelectedRadioValue(radios) {
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return radios[i].value;
            }
        }
    }

    // Обработчик отправки формы
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (validateForm()) {
            formData = {
                name: nameInput.value.trim(),
                number: numberInput.value.trim(),
                email: emailInput.value.trim(),
                gender: getSelectedRadioValue(radioInputs),
                TVshow: getCheckedValues(checkboxInputs),
                portal: selectInput.value,
                week: weekInput.value,
                review: reviewInput.value
            };
            let formDataArray = JSON.parse(localStorage.getItem("formData"));
            if (!Array.isArray(formDataArray)) {
                formDataArray = [];
            }

            console.log(formDataArray);
            formDataArray.push(formData);
            localStorage.setItem("formData", JSON.stringify(formDataArray));

            window.location.href = "index2.html";

            alert("Данные успешно отправлены!");
            form.reset();
        } else {
            alert("Пожалуйста, заполните все обязательные поля корректно.");
        }
    });
});