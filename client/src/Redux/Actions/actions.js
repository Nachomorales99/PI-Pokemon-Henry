import axios from 'axios';
import {
	GET_ALL_POKEMONS,
	GET_POKEMON_DETAIL,
	RESET_STATE,
	GET_ALL_TYPES,
	GET_NAME,
	HANDLER_TYPES,
	HANDLER_ORIGIN,
	ORDER,
	EMPTY,
} from './type';

export let get_all_pokemons = () => {
	return async function (dispatch) {
		let pokemons = await axios.get('http://localhost:3001/pokemons');

		return dispatch({
			type: GET_ALL_POKEMONS,
			payload: pokemons.data,
		});
	};
};

export let get_all_types = () => {
	return async function (dispatch) {
		let types = await axios.get('http://localhost:3001/types');

		return dispatch({
			type: GET_ALL_TYPES,
			payload: types.data,
		});
	};
};

export let handler_types = (type) => {
	return {
		type: HANDLER_TYPES,
		payload: type,
	};
};

export let handler_origin = (origin) => {
	return {
		type: HANDLER_ORIGIN,
		payload: origin,
	};
};

export let get_pokemon_detail = (id) => {
	return async function (dispatch) {
		let pokemon = await axios.get(`http://localhost:3001/pokemons/${id}`);

		return dispatch({
			type: GET_POKEMON_DETAIL,
			payload: pokemon.data,
		});
	};
};

export let getName = (name) => {
	return {
		type: GET_NAME,
		payload: name,
	};
};

export let resetState = () => {
	return {
		type: RESET_STATE,
	};
};

export let order = (order) => {
	return {
		type: ORDER,
		payload: order,
	};
};

export let create_pokemon = (payload) => {
	return async function () {
		let create = await axios.post(`http://localhost:3001/pokemons`, payload);
		return create;
	};
};

export let empty = () => {
	return {
		type: EMPTY,
	};
};
