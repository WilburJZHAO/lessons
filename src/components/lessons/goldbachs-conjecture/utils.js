import { legify } from "../../common/utils.js";

export const getPrimes = (n) => {
	var sieve = [],
		primes = [];
	for (let i = 2; i <= n; ++i) {
		if (!sieve[i]) {
			primes.push(legify(i));
			for (let j = i << 1; j <= n; j += i) {
				sieve[j] = true;
			}
		}
	}
	return primes;
};

//Get all prime pairs from a number
export const getPairs = (n, primes) => {
	var tupples = new Array();
	var len = primes.length;
	for (let i = 0; i < len; i++) {
		for (let j = len - 1; j >= i; j--) {
			if (primes[i] + primes[j] === n) {
				tupples.push([primes[i], primes[j]]);
				if(tupples.length === 10){
					return tupples;
				}
				break;
			}
		}
	}
	return tupples;
};