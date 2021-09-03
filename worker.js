import { findPrimes } from "./primes.js";

self.onmessage = (e) => {
  const bytesInFloat32 = 4;
  const primes = findPrimes(e.data);
  const primesArray = new Float32Array(
    new ArrayBuffer(bytesInFloat32 * primes.length)
  );
  primesArray.set(primes);
  self.postMessage(primesArray, [primesArray.buffer]);
};
