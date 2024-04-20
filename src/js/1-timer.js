import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateSelector = document.querySelector("input[type='text']");
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const btn = document.querySelector('button');

let userSelectedDate = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateSelector.style.borderColor = '';

    userSelectedDate = new Date(selectedDates[0]);
    let currentDate = new Date();
    if (userSelectedDate - currentDate < 0) {
      iziToast.show({
        titleColor: '#fff',
        messageColor: '#fff',
        backgroundColor: '#EF4040',
        position: 'topRight',
        title: 'Error',
        message: 'Please choose a date in the future?',
      });
      btn.classList.remove('button-active');
    } else {
      btn.classList.add('button-active');
      btn.addEventListener(
        'click',
        () => {
          btn.disabled = true;
          btn.classList.remove('button-active');
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
          });
        },
        1000
      );
    }
  },
  onOpen() {
    dateSelector.style.borderColor = '#4e75ff';
  },
};

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
  if (number < 10) {
    return '0' + number;
  } else {
    return number;
  }
}
