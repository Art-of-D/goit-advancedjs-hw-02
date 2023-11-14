"use strict";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const elements = {
    selector: document.querySelector("#datetime-picker"),
    startButton: document.querySelector("[data-start]"),
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]")
}
let today;
let userData;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
       today = new Date();
       userData = selectedDates[0];
       if (today > userData){
            iziToast.warning({
                message: 'Please choose a date in the future',
                position: 'topRight'
            });
       } else {
        elements.startButton.disabled = false;
       }
    },
};

flatpickr(elements.selector, options);
elements.startButton.disabled = true;
elements.startButton.addEventListener('click', backClock);


function backClock(){
    let gotData;
    userData = new Date(userData - today);
    //disabled changing of data
    elements.startButton.disabled = true;
    elements.selector.disabled = true;
    //1 sec clock timer logic
    const intervalId = setInterval(function () {
        if (userData > 999) {
            userData -= 1000;
            gotData = convertMs(userData);
            elements.days.textContent = (gotData.days < 10 ? "0" + gotData.days : gotData.days) || 0;
            elements.hours.textContent = (gotData.hours < 10 ? "0" + gotData.hours : gotData.hours) || 0;
            elements.minutes.textContent = (gotData.minutes < 10 ? "0" + gotData.minutes : gotData.minutes) || 0;
            elements.seconds.textContent = (gotData.seconds < 10 ? "0" + gotData.seconds : gotData.seconds) || 0;
        } else {
            clearInterval(intervalId);
            elements.selector.disabled = false;
        }
    }, 1000);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
    return {days, hours, minutes, seconds };
}