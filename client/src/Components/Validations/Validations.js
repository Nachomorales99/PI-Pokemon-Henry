export function validation(input) {
	let errors = {};
	let regexName = /^[A-Z][a-z]{3,10}$/;
	let regexStats = /^[0-9_-]{1,2}$/;

	if (!input.name.trim()) {
		errors.name = 'The field Name is required';
	} else if (!regexName.test(input.name.trim())) {
		errors.name = 'The Name field only accepts letters and 4 to 10 characters';
	}

	if (!input.hp.trim()) {
		errors.hp = 'HP field is required';
	} else if (!regexStats.test(input.hp.trim())) {
		errors.hp = 'The HP field only accepts numbers from 0 to 100';
	}

	if (!input.attack.trim()) {
		errors.attack = 'The Attacks field is required';
	} else if (!regexStats.test(input.attack.trim())) {
		errors.attack = 'The Attacks field only accepts numbers from 0 to 100';
	}

	if (!input.defense.trim()) {
		errors.defense = 'The Defense field is required';
	} else if (!regexStats.test(input.defense.trim())) {
		errors.defense = 'The Defense field only accepts numbers from 0 to 100';
	}

	if (!input.height.trim()) {
		errors.height = 'The Height field is required';
	} else if (!regexStats.test(input.height.trim())) {
		errors.height = 'The Height field only accepts numbers from 0 to 100';
	}

	if (!input.weight.trim()) {
		errors.weight = 'The Weight field is required';
	} else if (!regexStats.test(input.weight.trim())) {
		errors.weight = 'The Weight field only accepts numbers from 0 to 100';
	}

	if (!input.speed.trim()) {
		errors.speed = 'The Speed field is required';
	} else if (!regexStats.test(input.speed.trim())) {
		errors.speed = 'The Speed field only accepts numbers from 0 to 100';
	}

	if (!input.special_attack.trim()) {
		errors.special_attack = 'The Speed field is required';
	} else if (!regexStats.test(input.special_attack.trim())) {
		errors.special_attack =
			'The Special Attack field only accepts numbers from 0 to 100';
	}

	if (!input.special_defense.trim()) {
		errors.special_defense = 'The Speed field is required';
	} else if (!regexStats.test(input.special_defense.trim())) {
		errors.special_defense =
			'The Special Defense  field only accepts numbers from 0 to 100';
	}

	return errors;
}
