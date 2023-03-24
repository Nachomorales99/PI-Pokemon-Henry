export default function validation(input) {
	let errors = {};

	if (!input.name.trim()) {
		errors.name = 'The Name field is required';
	}

	if (!input.hp) {
		errors.hp = 'The HP field is required';
	}

	if (!input.attack) {
		errors.attack = 'The Attack field is required';
	}

	if (!input.defense) {
		errors.defense = 'The Defense field is required';
	}

	if (!input.height) {
		errors.height = 'The Height field is required';
	}

	if (!input.weight) {
		errors.weight = 'The Weight field is required';
	}

	if (!input.speed) {
		errors.speed = 'The Speed field is required';
	}
	if (!input.special_attack) {
		errors.special_attack = 'The Special Attack field is required';
	}

	if (!input.special_defense) {
		errors.special_defense = 'The Special Defense field is required';
	}

	if (!input.types.length) {
		errors.types = 'The Type field is required';
	}

	return errors;
}
