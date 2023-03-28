import {
	GET_ALL_POKEMONS,
	GET_POKEMON_DETAIL,
	RESET_STATE,
	GET_ALL_TYPES,
	GET_NAME,
	FILTERS,
	SET_FILTERS,
} from './Actions/type';

const initialState = {
	allPokemons: [], //MOSTRADO EN EL FRONT
	pokemons: [], // INMUTABLE
	types: [],
	detail: {},
	types2: 'all',
	origin: 'all',
	order: 'ascendent',
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

		case FILTERS:
			let filtered = state.pokemons;

			console.log(action.payload);

			//ORIGIN
			if (state.origin === 'db') {
				filtered = filtered.filter((el) => el.createdInDb === true);
			} else if (state.origin === 'api') {
				filtered = filtered.filter((el) => el.createdInDb === false);
			} else if (state.origin === 'all') {
				filtered = state.pokemons;
			}

			//TYPES
			if (state.types2 !== 'all') {
				filtered = filtered.filter((el) => el.types.includes(state.types2));
			} else if (state.types2 === 'all') {
				filtered = state.pokemons;
			}

			//ORDER
			if (state.order === 'ascendent' || state.order === 'descendant') {
				state.order === 'ascendent'
					? filtered.sort((a, b) => a.id2 - b.id2)
					: filtered.sort((a, b) => b.id2 - a.id2);
			} else if (state.order === 'a_z' || state.order === 'z_a') {
				state.order === 'a_z'
					? filtered.sort((a, b) => a.name.localeCompare(b.name))
					: filtered.sort((a, b) => b.name.localeCompare(a.name));
			} else if (
				state.order === 'major_attack' ||
				state.order === 'minor_attack'
			) {
				state.order === 'major_attack'
					? filtered.sort((a, b) => a.attack - b.attack)
					: filtered.sort((a, b) => b.attack - a.attack);
			}

			return {
				...state,
				allPokemons: filtered,
			};

		case SET_FILTERS:
			if (action.payload.types2) {
				return {
					...state,
					types2: action.payload.types2,
				};
			} else if (action.payload.origin) {
				return {
					...state,
					origin: action.payload.origin,
				};
			} else if (action.payload.order) {
				return {
					...state,
					order: action.payload.order,
				};
			} else {
				return {
					...state,
				};
			}

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
