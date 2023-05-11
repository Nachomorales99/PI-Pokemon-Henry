import axios from 'axios';
import {
	GET_ALL_POKEMONS,
	GET_POKEMON_DETAIL,
	RESET_STATE,
	GET_ALL_TYPES,
	SET_NAME,
	GET_NAME,
	FILTERS,
	SET_FILTERS,
	ORDER,
	SET_DELETE_POKEMON,
	SHOW_MODAL,
	MAYBE_ELIMINATE,
	SET_PAGE,
	SET_UPDATE_POKEMON,
	UPDATE_POKEMON,
} from './type';

const URL = 'http://localhost:3001';

export let get_all_pokemons = () => {
	return async function (dispatch) {
		let pokemons = await axios.get(`${URL}/pokemons`);

		dispatch({
			type: GET_ALL_POKEMONS,
			payload: pokemons.data,
		});

		dispatch({
			type: FILTERS,
		});
	};
};

export let get_all_types = () => {
	return async function (dispatch) {
		let types = await axios.get(`${URL}/types`);

		return dispatch({
			type: GET_ALL_TYPES,
			payload: types.data,
		});
	};
};

export let setFilter = (set) => {
	return {
		type: SET_FILTERS,
		payload: set,
	};
};

export let filters = () => {
	return {
		type: FILTERS,
	};
};

export let ordered = () => {
	return {
		type: ORDER,
	};
};

export let get_pokemon_detail = (id) => {
	return async function (dispatch) {
		let pokemon = await axios.get(`${URL}/pokemons/${id}`);

		return dispatch({
			type: GET_POKEMON_DETAIL,
			payload: pokemon.data,
		});
	};
};

export let get_new_detail = (id) => {
	return async function (dispatch) {
		let newPokemon = await axios.get(`${URL}/pokemons/${id}`);

		return dispatch({
			type: SET_UPDATE_POKEMON,
			payload: newPokemon.data,
		});
	};
};

export let new_pokemon_detail = () => {
	return {
		type: UPDATE_POKEMON,
	};
};

export let create_pokemon = (payload) => {
	return async function () {
		let create = await axios.post(`${URL}/pokemons`, payload);
		return create;
	};
};

export let delete_pokemon = (id) => {
	return async function () {
		let deleted = await axios.delete(`${URL}/pokemons/delete/${id}`);
		return deleted;
	};
};

export let update_pokemon = (payload) => {
	return async function () {
		let update = await axios.put(`${URL}/pokemons/update`, payload);
		return update;
	};
};

export let set_Delete_Pokemon = (id) => {
	return {
		type: SET_DELETE_POKEMON,
		payload: id,
	};
};

export let resetState = () => {
	return {
		type: RESET_STATE,
	};
};

export let setName = (name) => {
	return {
		type: SET_NAME,
		payload: name,
	};
};

export let getName = () => {
	return {
		type: GET_NAME,
	};
};

export let show_modal = (show) => {
	return {
		type: SHOW_MODAL,
		payload: show,
	};
};

export let maybe_eliminate = (id) => {
	return {
		type: MAYBE_ELIMINATE,
		payload: id,
	};
};

export let set_page = (page) => {
	return {
		type: SET_PAGE,
		payload: page,
	};
};
