import {
	GET_ALL_POKEMONS,
	GET_POKEMON_DETAIL,
	RESET_STATE,
} from './Actions/type';

const initialState = {
	allPokemons: [],
	pokemons: [],
	types: [],
	detail: {},
};

let reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_POKEMONS:
			return {
				...state,
				allPokemons: action.payload,
				pokemons: action.payload,
			};

		case GET_POKEMON_DETAIL:
			return {
				...state,
				detail: action.payload,
			};

		case RESET_STATE:
			return {
				...state,
				detail: {},
			};

		default:
			return { ...state };
	}
};

export default reducer;
