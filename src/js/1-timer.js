import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateSelector = document.querySelector("input[type='text']");
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const buttonStart = document.querySelector('button');
let isActive = false;
let currentDate = new Date();
let userSelectedDate = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateSelector.style.borderColor = '';
    userSelectedDate = selectedDates[0];
    currentDate = new Date();
    if (userSelectedDate - currentDate < 0) {
      iziToast.show({
        titleColor: '#fff',
        messageColor: '#fff',
        backgroundColor: '#EF4040',
        position: 'topRight',
        title: 'Error',
        message: 'Please choose a date in the future?',
      });
      buttonStart.classList.remove('button-active');
      isActive = false;
    } else {
      buttonStart.classList.add('button-active');
      isActive = true;
    }
  },
  onOpen() {
    dateSelector.style.borderColor = '#4e75ff';
  },
};
buttonStart.addEventListener('click', () => {
  if (isActive) {
    buttonStart.disabled = true;
    buttonStart.classList.remove('button-active');
    dateSelector.disabled = true;
    const timerId = setInterval(() => {
      currentDate = new Date();
      if (userSelectedDate - currentDate >= 0) {
        const timeData = convertMs(userSelectedDate - currentDate);
        days.textContent = addZero(timeData.days);
        hours.textContent = addZero(timeData.hours);
        minutes.textContent = addZero(timeData.minutes);
        seconds.textContent = addZero(timeData.seconds);
      } else {
        clearInterval(timerId);
      }
    }, 1000);
  }
});

flatpickr(dateSelector, options);

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

  return { days, hours, minutes, seconds };
}

function addZero(number) {
  return String(number).padStart(2, '0');
}
