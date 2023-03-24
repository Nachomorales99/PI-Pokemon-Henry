export default function validation(input) {
	let errors = {};
	let regexName = /^[a-zA-Z]{4,10}$/;
	let regexStats = /^([1-9]|[1-9][0-9]|100)$/;
	let regexUrl = /^https?:\/\/.*png.*/;

	if (input.name && !regexName.test(input.name.trim())) {
		errors.name = 'The Name field only accepts letters and 4 to 10 characters';
	}

	if (input.hp && !regexStats.test(input.hp)) {
		errors.hp = 'The HP field only accepts numbers from 0 to 100';
	}

	if (input.attack && !regexStats.test(input.attack)) {
		errors.attack = 'The Attacks field only accepts numbers from 0 to 100';
	}

	if (input.defense && !regexStats.test(input.defense)) {
		errors.defense = 'The Defense field only accepts numbers from 0 to 100';
	}

	if (input.height && !regexStats.test(input.height)) {
		errors.height = 'The Height field only accepts numbers from 0 to 100';
	}

	if (input.weight && !regexStats.test(input.weight)) {
		errors.weight = 'The Weight field only accepts numbers from 0 to 100';
	}

	if (input.speed && !regexStats.test(input.speed)) {
		errors.speed = 'The Speed field only accepts numbers from 0 to 100';
	}
	if (input.special_attack && !regexStats.test(input.special_attack)) {
		errors.special_attack =
			'The Special Attack field only accepts numbers from 0 to 100';
	}

	if (input.special_defense && !regexStats.test(input.special_defense)) {
		errors.special_defense =
			'The Special Defense  field only accepts numbers from 0 to 100';
	}

	if (input.image && !regexUrl.test(input.image.trim())) {
		errors.image = 'The image must be in png format';
	}

	return errors;
}
