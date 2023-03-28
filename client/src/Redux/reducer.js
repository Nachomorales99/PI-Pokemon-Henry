import {
	GET_ALL_POKEMONS,
	GET_POKEMON_DETAIL,
	RESET_STATE,
	GET_ALL_TYPES,
	GET_NAME,
	HANDLER_TYPES,
	HANDLER_ORIGIN,
	ORDER,
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

		case GET_ALL_TYPES:
			return {
				...state,
				types: action.payload,
			};

		case HANDLER_TYPES:
			let type =
				action.payload === 'all'
					? state.pokemons
					: state.pokemons?.filter((el) => el.types?.includes(action.payload));

			return {
				...state,
				allPokemons: type,
			};

		case HANDLER_ORIGIN:
			let copyPokemons = state.pokemons;
			let origin = action.payload;

			if (origin === 'all') return { ...state, allPokemons: copyPokemons };
			if (origin === 'db')
				copyPokemons = copyPokemons.filter((el) => el.createdInDb === true);

			return {
				...state,
				allPokemons: copyPokemons,
			};

		case ORDER:
			let sort = action.payload;
			let newOrder = state.allPokemons;

			if (sort === 'ascendent' || sort === 'descendant') {
				sort === 'ascendent'
					? newOrder.sort((a, b) => a.id2 - b.id2)
					: newOrder.sort((a, b) => b.id2 - a.id2);
			} else if (sort === 'a_z' || sort === 'z_a') {
				sort === 'a_z'
					? newOrder.sort((a, b) => a.name.localeCompare(b.name))
					: newOrder.sort((a, b) => b.name.localeCompare(a.name));
			} else if (sort === 'major_attack' || sort === 'minor_attack') {
				sort === 'major_attack'
					? newOrder.sort((a, b) => a.attack - b.attack)
					: newOrder.sort((a, b) => b.attack - a.attack);
			}

			return {
				...state,
				allPokemons: newOrder,
			};

		case GET_NAME:
			let name =
				action.payload === ''
					? state.pokemons
					: state.allPokemons.filter((el) =>
							el.name.toLowerCase().includes(action.payload.toLowerCase()),
					  );

			return {
				...state,
				allPokemons: name,
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

// const initialState = {
// 	allPokemons: [],
// 	pokemons: [],
// 	types: [],
// 	filteredByType: [],
// 	filteredByOrigin: [],
// 	detail: {},
// };

// let reducer = (state = initialState, action) => {
// 	switch (action.type) {

// 		case HANDLER_TYPES:
// 			let type =
// 				action.payload === 'all'
// 					? state.pokemons
// 					: state.pokemons?.filter((el) => el.types?.includes(action.payload));

// 			let filteredByOrigin = state.filteredByOrigin ?? state.pokemons;
// 			let allPokemons = filteredByOrigin?.filter((el) => type?.includes(el));

// 			return {
// 				...state,
// 				filteredByOrigin: type,
// 				allPokemons: allPokemons,
// 			};

// 		case HANDLER_ORIGIN:
// 			let origin = action.payload;

// 			let filteredByType = state.filteredByType ?? state.pokemons;

// 			let filteredByOrigin2 = filteredByType;

// 			if (origin === 'db')
// 				filteredByOrigin2 = filteredByType?.filter(
// 					(el) => el.createdInDb === true,
// 				);

// 			let allPokemons2 = filteredByOrigin2?.filter((el) =>
// 				filteredByType?.includes(el),
// 			);

// 			return {
// 				...state,
// 				filteredByOrigin: filteredByOrigin2,
// 				allPokemons: allPokemons2,
// 			};
