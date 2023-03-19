import axios from 'axios';
import { GET_ALL_POKEMONS, GET_POKEMON_DETAIL, RESET_STATE } from './type';

export let get_all_pokemons = () => {
	return async function (dispatch) {
		let pokemons = await axios.get('http://localhost:3001/pokemons');

		return dispatch({
			type: GET_ALL_POKEMONS,
			payload: pokemons.data,
		});
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

export let resetState = () => {
	return {
		type: RESET_STATE,
	};
};
