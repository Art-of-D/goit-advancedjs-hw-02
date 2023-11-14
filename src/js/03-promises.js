"use strict";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const elements = {
  firstDelay: document.querySelector('input[name=delay]'),
  delayStep: document.querySelector('input[name=step]'),
  promiseAmount: document.querySelector('input[name=amount]'),
  promiseButton: document.querySelector('button'),
}
let amountOfPromise;

elements.promiseButton.addEventListener('click', promiseHandler);

//promise logic
function promiseHandler(event){
  event.preventDefault();
  const startDelay = +elements.firstDelay.value;
  const nextStepDelay = +elements.delayStep.value;
  amountOfPromise = elements.promiseAmount.value;
  elements.promiseButton.disabled = true;

  for(let i = 0; i < amountOfPromise; i++) {
    createPromise(i + 1, startDelay + (nextStepDelay * i))
      .then((value) => onSuccesShow(value))
      .catch((reason) => onErrorShow(reason))
      .finally(() => {
        if (i === amountOfPromise - 1){
          elements.promiseButton.disabled = false;
        }
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve({position, delay});
        } else {
          reject({position, delay});
      }
    }, delay)});
}

function onSuccesShow({position, delay}){
  iziToast.success({
    message: `Fulfilled promise ${position} in ${delay}ms`,
    position: 'topRight',
  });
}

function onErrorShow({position, delay}){
  iziToast.error({
    message: `Rejected promise ${position} in ${delay}ms`,
    position: 'topRight',
  });
}