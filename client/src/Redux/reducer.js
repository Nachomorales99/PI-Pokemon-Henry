import {
	GET_ALL_POKEMONS,
	GET_POKEMON_DETAIL,
	RESET_STATE,
	GET_ALL_TYPES,
	SET_NAME,
	GET_NAME,
	FILTERS,
	ORDER,
	SET_FILTERS,
	RESET_ALLPOKEMONS,
	SET_DELETE_POKEMON,
	SHOW_MODAL,
	MAYBE_ELIMINATE,
	SET_PAGE,
	SET_UPDATE_POKEMON,
	UPDATE_POKEMON,
} from './Actions/type';

const initialState = {
	allPokemons: [],
	pokemons: [],
	types: [],
	filtered: [],
	detail: {},
	types2: 'all',
	origin: 'kanto',
	order: 'ascendent',
	name: '',
	showModal: null,
	maybe_delete: null,
	currentPage: 1,
	newDetail: {},
};

let reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_POKEMONS:
			return {
				...state,
				allPokemons: action.payload,
				pokemons: action.payload,
				filtered: action.payload,
			};

		case GET_ALL_TYPES:
			return {
				...state,
				types: action.payload,
			};

		case SET_FILTERS:
			if (
				action.payload.types2 &&
				action.payload.origin &&
				action.payload.order
			) {
				return {
					...state,
					types2: action.payload.types2,
					origin: action.payload.origin,
					order: action.payload.order,
				};
			} else if (action.payload.types2) {
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

		case FILTERS:
			let filtered = state.pokemons;

			//TYPES
			if (state.types2 !== 'all') {
				filtered = filtered.filter((el) => el.types.includes(state.types2));
			}

			//ORIGIN
			filtered = filtered.filter((el) => el.region === state.origin);

			return {
				...state,
				allPokemons: filtered,
				filtered: filtered,
			};

		case ORDER:
			let ordered = state.allPokemons;
			//ORDER
			if (state.order === 'ascendent' || state.order === 'descendant') {
				state.order === 'ascendent'
					? ordered.sort((a, b) => a.id2 - b.id2)
					: ordered.sort((a, b) => b.id2 - a.id2);
			} else if (state.order === 'a_z' || state.order === 'z_a') {
				state.order === 'a_z'
					? ordered.sort((a, b) => a.name.localeCompare(b.name))
					: ordered.sort((a, b) => b.name.localeCompare(a.name));
			} else if (
				state.order === 'major_attack' ||
				state.order === 'minor_attack'
			) {
				state.order === 'major_attack'
					? ordered.sort((a, b) => a.attack - b.attack)
					: ordered.sort((a, b) => b.attack - a.attack);
			}

			return {
				...state,
				allPokemons: ordered,
			};

		case SET_NAME:
			console.log(state.name);
			return {
				...state,
				name: action.payload.name,
			};

		case GET_NAME:
			let name =
				state.name === ''
					? state.filtered
					: state.filtered.filter((el) =>
							el.name.toLowerCase().includes(state.name.toLowerCase()),
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

		case SET_DELETE_POKEMON:
			return {
				...state,
				allPokemons: state.allPokemons.filter((el) => el.id !== action.payload),
				pokemons: state.pokemons.filter((el) => el.id !== action.payload),
				filtered: state.filtered.filter((el) => el.id !== action.payload),
			};

		case SET_UPDATE_POKEMON:
			return {
				...state,
				newDetail: action.payload,
			};

		case UPDATE_POKEMON:
			return {
				...state,
				detail: state.newDetail,
			};

		case SHOW_MODAL:
			return {
				...state,
				showModal: action.payload,
			};

		case MAYBE_ELIMINATE:
			return { ...state, maybe_delete: action.payload };

		case SET_PAGE:
			return {
				...state,
				currentPage: action.payload,
			};

		case RESET_STATE:
			return {
				...state,
				detail: {},
			};

		case RESET_ALLPOKEMONS:
			return {
				...state,
				allPokemons: [],
				pokemons: [],
				filtered: [],
			};

		default:
			return { ...state };
	}
};

export default reducer;
