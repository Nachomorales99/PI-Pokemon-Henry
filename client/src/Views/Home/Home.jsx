import React, { useEffect } from 'react';
import './Home.css';
import Pagination from '../../Components/Pagination/Pagination';
import CardsContainer from '../../Components/CardsContainer/CardsContainer';
import { useDispatch } from 'react-redux';
import { get_all_pokemons } from '../../Redux/Actions/actions';

const Home = () => {
	let dispatch = useDispatch();

	useEffect(() => {
		dispatch(get_all_pokemons());
	}, []);

	return (
		<>
			<CardsContainer />
			<Pagination />
		</>
	);
};

export default Home;
