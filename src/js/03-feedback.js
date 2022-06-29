import throttle from 'lodash.throttle';

const refs = {
    feedbackForm: document.querySelector('.feedback-form'),
    email: document.querySelector('.feedback-form input'),
    message: document.querySelector('.feedback-form textarea'),
}

const LOCAL_STORAGE_KEY = "feedback-form-state";

refs.feedbackForm.addEventListener('submit', onSubmitBtnClick);

refs.feedbackForm.addEventListener('input', throttle(onSaveFormData, 500));

let formData = {};

function onSubmitBtnClick(event) {
    event.preventDefault();
 
    if (refs.email.value === "" || refs.message.value === "") {
        alert("Все поля необходимо заполнить");
        return;
    }
    console.log({email: refs.email.value, message: refs.message.value});
    event.currentTarget.reset();
    localStorage.removeItem(LOCAL_STORAGE_KEY);
}

function onSaveFormData(event) {
    formData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
    formData[event.target.name] = event.target.value;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

onLoadFromData();

function onLoadFromData() {
    const parsedFormData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if (!parsedFormData) return;

    refs.email.value = parsedFormData.email || '';
    refs.message.value = parsedFormData.message || '';
}
