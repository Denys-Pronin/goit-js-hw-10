import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('form');
form.addEventListener('submit', e => {
  const state = document.querySelector('[name="state"]:checked').value;
  const userDelay = Number(document.querySelector('[name="delay"]').value);
  e.preventDefault();
  form.reset();
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(userDelay);
      } else {
        reject(userDelay);
      }
    }, userDelay);
  });

  promise
    .then(userDelay => {
      iziToast.success({
        position: 'topRight',
        backgroundColor: '#59A10D',
        messageColor: '#fff',
        message: `✅ Fulfilled promise in ${userDelay}ms`,
      });
    })
    .catch(userDelay => {
      iziToast.error({
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#fff',
        message: `❌ Rejected promise in ${userDelay}ms`,
      });
    });
});
