type FinalValuesType = string | number;

export const decimalToBinary = (number: number) => {
	let dividend = number;
	const divisor = 2;

	const rests: number[] = [];
	const quotients: number[] = [];

	while (!quotients.length || quotients[quotients.length - 1] >= 1) {
		const quotient = Math.floor(dividend / divisor);

		rests.push(dividend % divisor);
		quotients.push(quotient);

		dividend = quotient;
	}

	while (rests.length < 8) {
		rests.push(0);
	}
	return rests.reverse().join('');
};

export const binaryToDecimal = (binary: string) => {
	const reversed = binary.split('').reverse();

	let accumulator: number = 0;

	reversed.forEach(
		(value, index) => (accumulator += Number(value) * 2 ** index)
	);

	return accumulator;
};

export const charToDecimal = (char: string) => char.charCodeAt(0);

export const decimalToChar = (number: number) => {
	const char = String.fromCharCode(number);

	return char;
};

export const decimalToOctal = (number: number) => {
	let dividend = number;
	const divisor = 8;

	const rests: number[] = [];
	const quotients: number[] = [];

	while (!quotients.length || quotients[quotients.length - 1] >= 1) {
		const quotient = Math.floor(dividend / divisor);

		rests.push(dividend % divisor);
		quotients.push(quotient);

		dividend = quotient;
	}

	while (rests.length < 4) {
		rests.push(0);
	}

	return rests.reverse().join('');
};

export const octalToDecimal = (octal: string) => {
	const reversed = octal.split('').reverse();

	let accumulator: number = 0;

	reversed.forEach(
		(value, index) => (accumulator += Number(value) * 8 ** index)
	);

	return accumulator;
};

export const decimalToHexadecimal = (number: number) => {
	let dividend = number;
	const divisor = 16;

	const rests: number[] = [];
	const quotients: number[] = [];

	while (!quotients.length || quotients[quotients.length - 1] >= 1) {
		const quotient = Math.floor(dividend / divisor);

		rests.push(dividend % divisor);
		quotients.push(quotient);

		dividend = quotient;
	}

	const finalValues: FinalValuesType[] = [...rests];

	rests.forEach((value, index) => {
		switch (value) {
			case 10:
				finalValues.splice(index, 1, 'A');
				return;
			case 11:
				finalValues.splice(index, 1, 'B');
				return;
			case 12:
				finalValues.splice(index, 1, 'C');
				return;
			case 13:
				finalValues.splice(index, 1, 'D');
				return;
			case 14:
				finalValues.splice(index, 1, 'E');
				return;
			case 15:
				finalValues.splice(index, 1, 'F');
				return;
			default:
				return;
		}
	});

	return finalValues.reverse().join('');
};

export const hexadecimalToDecimal = (hexadecimal: string) => {
	const reversed = hexadecimal.split('').reverse();
	const parsedValues = [...reversed];

	reversed.forEach((value, index) => {
		switch (value) {
			case 'A':
				parsedValues.splice(index, 1, '10');
				return;
			case 'B':
				parsedValues.splice(index, 1, '11');
				return;
			case 'C':
				parsedValues.splice(index, 1, '12');
				return;
			case 'D':
				parsedValues.splice(index, 1, '13');
				return;
			case 'E':
				parsedValues.splice(index, 1, '14');
				return;
			case 'F':
				parsedValues.splice(index, 1, '15');
				return;
			default:
				return;
		}
	});

	let accumulator: number = 0;

	parsedValues.forEach(
		(value, index) => (accumulator += Number(value) * 16 ** index)
	);

	return accumulator;
};
