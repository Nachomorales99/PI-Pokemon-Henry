import React, { useEffect } from 'react';
import { useParams /*useNavigate*/ } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_pokemon_detail, resetState } from '../../Redux/Actions/actions';
import './Detail.css';

const Detail = () => {
	let { id } = useParams();
	// let navigate = useNavigate();
	let dispatch = useDispatch();
	let pokemon = useSelector((state) => state.detail);

	useEffect(() => {
		dispatch(get_pokemon_detail(Number(id)));
		return () => {
			dispatch(resetState());
		};
	}, [dispatch, id]);

	return (
		<>
			<h3>{pokemon.name}</h3>
		</>
	);
};

export default Detail;
