import { GET_ALL_POKEMONS } from './Actions/type';

const initialState = {
	allPokemons: [],
	pokemons: [],
	types: [],
	detail: {},
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_POKEMONS:
			return {
				...state,
				allPokemons: action.payload,
				pokemons: action.payload,
			};

		default:
			return { ...state };
	}
}

export default reducer;
