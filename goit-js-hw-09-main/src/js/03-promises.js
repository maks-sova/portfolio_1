

import Notiflix from 'notiflix';

const delay1 = document.querySelector('input[name = "delay"]');
const step1 = document.querySelector('input[name = "step"]');
const amount1 = document.querySelector('input[name = "amount"]');
const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {

    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay);


  })
}


const handler = (event) => {
  event.preventDefault();
  const amount = Number(amount1.value);
  let delay = Number(delay1.value);
  const step = Number(step1.value);
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
      .catch(({ position, delay }) => Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
    delay += step;
  }

}

form.addEventListener('submit', handler);


