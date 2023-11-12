import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';



const calendar = document.querySelector("#datetime-picker");
const start = document.querySelector('button[data-start]');
start.setAttribute("disabled", true);
const daysRemain = document.querySelector('span[data-days]');
const hoursRemain = document.querySelector('span[data-hours]');
const minutesRemain = document.querySelector('span[data-minutes]');
const secondsRemain = document.querySelector('span[data-seconds]');

daysRemain.textContent = `00`;
  hoursRemain.textContent = `00`;
  minutesRemain.textContent = `00`;
  secondsRemain.textContent = `00`;

const timer = document.querySelector('.timer');
timer.style.display = "flex";
const labels = document.querySelectorAll('.label');
const values = document.querySelectorAll('.value');

for (value of values) {
  
  value.style.color = "green";
  value.style.fontWeight = "700";
  value.style.fontSize = "30px";
  value.style.display = "block"
  
};


/* for (label of labels) {
  
  //label.style.display = "none";
  
}; */

const fields = document.querySelectorAll('.field');

for (field of fields) {
  
  field.style.display = "block";
  field.style.textAlign = "center";
  field.style.marginRight = "10px";
  
};


let intervalId = 0;
let difference = 0;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //console.log(selectedDates[0]);    
    const date = new Date();    
    difference = selectedDates[0] - date;    
    if (difference < 0) {
      //alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
      start.setAttribute("disabled", true);
    } else {
      start.removeAttribute("disabled");
    }
  },
};

flatpickr(calendar, options);

start.addEventListener('click', () => {
  
  intervalId = setInterval(() => {
      
    console.log(convertMs(difference));
    difference -= 1000;


    if (difference<0) {
    console.log(difference);
    clearInterval(intervalId);
  }

  }, 1000);
  
  
    
});

const addLeadingZero = (value) => {
  return value.toString().padStart(2, "0")
};

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

  daysRemain.textContent = `${addLeadingZero(days)}`;
  hoursRemain.textContent = `${addLeadingZero(hours)}`;
  minutesRemain.textContent = `${addLeadingZero(minutes)}`;
  secondsRemain.textContent = `${addLeadingZero(seconds)}`;

  
  return { days, hours, minutes, seconds };
  
}



