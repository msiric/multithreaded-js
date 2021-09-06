import { findPrimes } from "./primes.js";

const inputs = document.getElementsByClassName("input");

const form = document.querySelector("#form");
const result = document.querySelector("#result");
const primes = document.querySelector("#primes");
const generator = document.querySelector("#generator");
const thread = document.querySelector("#thread");
const calculate = document.querySelector("#calculate");
const randomize = document.querySelector("#randomize");

let startTime, totalTime, counter;
const numberOfPrimesSingle = [];
const numberOfPrimesMulti = [];

const displayPerformance = (id, value) => {
  const execution = document.querySelector(`#${id}`);
  execution.textContent = `${execution.dataset.label} elapsed time: ${value}`;
};

const displayPrimes = (values) => {
  primes.innerHTML = "";
  values.map((item, index) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = `${
      index + 1
    }. value contains ${item} prime numbers`;
    primes.appendChild(paragraph);
  });
};

const displayResult = () => {
  result.style.display = "block";
};

const randomizeValues = () => {
  for (let item of inputs) {
    const randValue =
      Math.floor(Math.random() * (9 * Math.pow(10, generator.value - 1))) +
      Math.pow(10, generator.value - 1);
    item.value = randValue;
  }
};

const singleCalculate = async () => {
  displayPerformance("singlethread", "Loading...");
  startTime = performance.now();
  for (let i = 0; i < inputs.length; i++) {
    const foundPrimes = findPrimes(inputs[i].value);
    numberOfPrimesSingle.push(foundPrimes.length);
  }
  totalTime = performance.now() - startTime;
  displayPerformance("singlethread", `${totalTime.toFixed(2)}ms`);
};

const multiCalculate = () => {
  const workers = [...new Array(parseInt(thread.value))].map(
    () => new Worker("worker.js", { type: "module" })
  );
  displayPerformance("multithread", "Loading...");
  startTime = performance.now();
  for (let i = 0; i < inputs.length; i++) {
    workers[i % workers.length].onmessage = workerDone;
    workers[i % workers.length].postMessage(inputs[i].value);
    counter++;
  }
};

const workerDone = (e) => {
  counter--;
  numberOfPrimesMulti.push(e.data.length);
  if (counter === 0) {
    totalTime = performance.now() - startTime;
    displayPerformance("multithread", `${totalTime.toFixed(2)}ms`);
    displayPrimes(numberOfPrimesSingle);
    displayResult();
    toggleButton();
  }
};

const toggleButton = () => {
  calculate.disabled = !calculate.disabled;
};

const cleanUp = () => {
  numberOfPrimesSingle.length = 0;
  numberOfPrimesMulti.length = 0;
  counter = 0;
};

if (window.Worker) {
  form.onsubmit = (e) => {
    cleanUp();
    e.preventDefault();
    toggleButton();
    singleCalculate();
    multiCalculate();
  };

  randomize.onclick = () => {
    randomizeValues();
  };
} else {
  alert("Your browser doesn't support web workers.");
}
