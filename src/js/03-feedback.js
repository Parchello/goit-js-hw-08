const form = document.querySelector('.feedback-form');
const mailInput = document.querySelector('.feedback-form input');
const textInput = document.querySelector('.feedback-form textarea');

const throttle = require('lodash.throttle');

mailInput.addEventListener('input', throttle(onInputFunction, 500));
textInput.addEventListener('input', throttle(onInputFunction, 500));
form.addEventListener('submit', onSubmitFunction);

checkStorage();

function onInputFunction() {
  const localStorageObject = {
    email: mailInput.value,
    message: textInput.value,
  };
  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify(localStorageObject)
  );
}

function checkStorage() {
  const localParsedObject = JSON.parse(
    localStorage.getItem('feedback-form-state')
  );

  if (localParsedObject) {
    mailInput.value = localParsedObject.email;
    textInput.value = localParsedObject.message;
  }
}

function onSubmitFunction(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  const subParsed = JSON.parse(localStorage.getItem('feedback-form-state'));
  console.log(subParsed);
  localStorage.removeItem('feedback-form-state');
}
