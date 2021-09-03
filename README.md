# Multi-threaded JavaScript

Project made to test the capabilities of dedicated Web Workers.

You can play around with different settings here: [Demo](https://vibrant-babbage-51b502.netlify.app/) (I recommend running the program locally since Netlify yields fluctuating results)

Web Workers are scripts that, when executed, run on background threads away from the main execution thread. Data is sent between workers and the main thread via a system of messages. This allows for processing intensive tasks on a worker thread without interfering with the user interface.

## Features

A sieve algorithm is used to calculate all the prime numbers contained in each of the provided values. 
The number of digits (1-10) generated for each value can be modified for testing purposes.
The maximum number of threads is limited to 4 since increasing over this value wouldn't make sense in this context (delegating 4 input values to more than 4 workers doesn't improve performance in any way).

## Implementation

When the script is run, the single-threaded process is executed first. All the prime numbers contained in each of the values are found and returned one after the other. 
Subsequently, the multi-threaded process is executed.
Depending on the number of threads specified by the user, worker objects are created and input values passed to them via messages. Each thread executes the sieve algorithm and returns prime numbers as soon as it finishes.
The elapsed time for both processes is displayed after the script finishes executing.

## Heads up

Be careful when entering/generating the number of digits for each value.
Most CPUs are powerful enough to process up to 7-8 digit values, but everything above that could end up freezing or crashing your browser.
Shorter freezes are normal, especially when processing larger values on the main thread, so be patient.
Results of the test vary greatly depending on the browser and the hardware of your device.
At the time of writing, Firefox doesn't support ES6 import statements inside workers so the program won't execute in this environment.

## Final note

The difference between single-threaded and multi-threaded processes can be noticed as soon as the program is run.
Once the main thread is blocked executing the single-threaded process, the interface freezes and there are no visible updates; the button doesn't change state, the loading indicator doesn't show up in the results section and the page is unresponsive.
On the other hand, executing the multi-threaded process allows for running scripts in background threads without blocking the main thread. This means that the interface is responsive and all the state updates are reflected instantly. There is also a significant performance improvement if settings are adjusted properly.

## License

MIT
