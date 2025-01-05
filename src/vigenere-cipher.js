const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
	constructor(isDirect = true) {
		this.isDirect = isDirect;
	}

	encrypt(message, key) {
		if (message === undefined || key === undefined) {
			throw new Error("Incorrect arguments!");
		}

		message = message.toUpperCase();
		key = key.toUpperCase();
		let result = [];
		let keyIndex = 0;

		for (let i = 0; i < message.length; i++) {
			const messageChar = message[i];

			if (messageChar >= "A" && messageChar <= "Z") {
				const messageCode = messageChar.charCodeAt(0) - "A".charCodeAt(0);
				const keyChar = key[keyIndex % key.length];
				const keyCode = keyChar.charCodeAt(0) - "A".charCodeAt(0);

				const encryptedChar = String.fromCharCode(
					((messageCode + keyCode) % 26) + "A".charCodeAt(0)
				);
				result.push(encryptedChar);

				keyIndex++;
			} else {
				result.push(messageChar);
			}
		}

		return this.isDirect ? result.join("") : result.reverse().join("");
	}

	decrypt(message, key) {
		if (message === undefined || key === undefined) {
			throw new Error("Incorrect arguments!");
		}

		message = message.toUpperCase();
		key = key.toUpperCase();
		let result = [];
		let keyIndex = 0;

		for (let i = 0; i < message.length; i++) {
			const messageChar = message[i];

			if (messageChar >= "A" && messageChar <= "Z") {
				const messageCode = messageChar.charCodeAt(0) - "A".charCodeAt(0);
				const keyChar = key[keyIndex % key.length];
				const keyCode = keyChar.charCodeAt(0) - "A".charCodeAt(0);
				const decryptedChar = String.fromCharCode(
					((messageCode - keyCode + 26) % 26) + "A".charCodeAt(0)
				);
				result.push(decryptedChar);

				keyIndex++;
			} else {
				result.push(messageChar);
			}
		}

		return this.isDirect ? result.join("") : result.reverse().join("");
	}
}

module.exports = {
	VigenereCipheringMachine,
};
