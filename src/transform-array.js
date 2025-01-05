const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
	// Check if the input is an array, return an error if it's not
	if (!Array.isArray(arr)) {
		throw new Error("'arr' parameter must be an instance of the Array!");
	}

	let result = [];
	let i = 0;

	while (i < arr.length) {
		switch (arr[i]) {
			case "--discard-prev":
				if (i !== 0 && arr[i - 2] !== "--discard-next") {
					result.pop();
				}
				break;
			case "--discard-next":
				i++;
				break;
			case "--double-next":
				if (i < arr.length - 1) {
					result.push(arr[i + 1]);
				}
				break;
			case "--double-prev":
				if (i !== 0 && arr[i - 2] !== "--discard-next") {
					result.push(arr[i - 1]);
				}
				break;
			default:
				result.push(arr[i]);
		}
		i++;
	}
	return result;
}

module.exports = {
	transform,
};
