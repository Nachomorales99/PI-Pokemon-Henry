export default function validation(input) {
	let errors = {};
	let regexName = /^[a-zA-Z]{4,10}$/;
	let regexStats = /^([1-9]|[1-9][0-9]|100)$/;
	let regexHp = /^([1-9]|[1-9][0-9]|1[0-4][0-9]|150)$/;
	let regexSpecial = /^([1-9]|[1-9][0-9]|1[01][0-9]|120)$/;
	let regexHeight = /^([1-9]|[1-4][0-9]|50)$/;
	let regexWeight = /^([1-9][0-9]{2}|1000)$/;
	let regexUrl = /^https?:\/\/.*png.*/;

	if (input.name && !regexName.test(input.name.trim())) {
		errors.name = 'The Name field only accepts letters and 4 to 10 characters';
	}

	if (input.hp && !regexHp.test(input.hp)) {
		errors.hp = 'The HP field only accepts numbers from 1 to 150';
	}

	if (input.attack && !regexStats.test(input.attack)) {
		errors.attack = 'The Attacks field only accepts numbers from 1 to 100';
	}

	if (input.defense && !regexStats.test(input.defense)) {
		errors.defense = 'The Defense field only accepts numbers from 1 to 100';
	}

	if (input.height && !regexHeight.test(input.height)) {
		errors.height = 'The Height field only accepts numbers from 1 to 50';
	}

	if (input.weight && !regexWeight.test(input.weight)) {
		errors.weight = 'The Weight field only accepts numbers from 100 to 1000';
	}

	if (input.speed && !regexStats.test(input.speed)) {
		errors.speed = 'The Speed field only accepts numbers from 1 to 100';
	}
	if (input.special_attack && !regexSpecial.test(input.special_attack)) {
		errors.special_attack =
			'The Special Attack field only accepts numbers from 1 to 120';
	}

	if (input.special_defense && !regexSpecial.test(input.special_defense)) {
		errors.special_defense =
			'The Special Defense  field only accepts numbers from 1 to 120';
	}

	if (input.image && !regexUrl.test(input.image.trim())) {
		errors.image = 'The image must be in png format';
	}

	return errors;
}
